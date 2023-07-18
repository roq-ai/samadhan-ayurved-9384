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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getTherapistById, updateTherapistById } from 'apiSdk/therapists';
import { Error } from 'components/error';
import { therapistValidationSchema } from 'validationSchema/therapists';
import { TherapistInterface } from 'interfaces/therapist';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function TherapistEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<TherapistInterface>(
    () => (id ? `/therapists/${id}` : null),
    () => getTherapistById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: TherapistInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateTherapistById(id, values);
      mutate(updated);
      resetForm();
      router.push('/therapists');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<TherapistInterface>({
    initialValues: data,
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
            Edit Therapist
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="profile_info" mb="4" isInvalid={!!formik.errors?.profile_info}>
              <FormLabel>Profile Info</FormLabel>
              <Input
                type="text"
                name="profile_info"
                value={formik.values?.profile_info}
                onChange={formik.handleChange}
              />
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
        )}
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(TherapistEditPage);
