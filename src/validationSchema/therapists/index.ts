import * as yup from 'yup';

export const therapistValidationSchema = yup.object().shape({
  profile_info: yup.string(),
  services_info: yup.string(),
  user_id: yup.string().nullable(),
});
