import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { therapistValidationSchema } from 'validationSchema/therapists';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.therapist
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTherapistById();
    case 'PUT':
      return updateTherapistById();
    case 'DELETE':
      return deleteTherapistById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTherapistById() {
    const data = await prisma.therapist.findFirst(convertQueryToPrismaUtil(req.query, 'therapist'));
    return res.status(200).json(data);
  }

  async function updateTherapistById() {
    await therapistValidationSchema.validate(req.body);
    const data = await prisma.therapist.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteTherapistById() {
    const data = await prisma.therapist.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
