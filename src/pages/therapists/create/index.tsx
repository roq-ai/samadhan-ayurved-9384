import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createTherapist } from 'apiSdk/therapists';
import { Error } from 'components/error';
import { therapistValidationSchema } from 'validationSchema/therapists';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { TherapistInterface } from 'interfaces/therapist';

function TherapistCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TherapistInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTherapist(values);
      resetForm();
      router.push('/therapists');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TherapistInterface>({
    initialValues: {
      profile_info: '',
      services_info: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: therapistValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Therapist
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="profile_info" mb="4" isInvalid={!!formik.errors?.profile_info}>
            <FormLabel>Profile Info</FormLabel>
            <Input type="text" name="profile_info" value={formik.values?.profile_info} onChange={formik.handleChange} />
            {formik.errors.profile_info && <FormErrorMessage>{formik.errors?.profile_info}</FormErrorMessage>}
          </FormControl>
          <FormControl id="services_info" mb="4" isInvalid={!!formik.errors?.services_info}>
            <FormLabel>Services Info</FormLabel>
            <Input
              type="text"
              name="services_info"
              value={formik.values?.services_info}
              onChange={formik.handleChange}
            />
            {formik.errors.services_info && <FormErrorMessage>{formik.errors?.services_info}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'therapist',
    operation: AccessOperationEnum.CREATE,
  }),
)(TherapistCreatePage);
