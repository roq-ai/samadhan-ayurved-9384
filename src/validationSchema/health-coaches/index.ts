import * as yup from 'yup';

export const healthCoachValidationSchema = yup.object().shape({
  profile_info: yup.string(),
  services_info: yup.string(),
  user_id: yup.string().nullable(),
});
