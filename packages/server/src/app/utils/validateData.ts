import * as yup from 'yup';

import formatYupErrors from './formatYupErrors';

export default async function validateRecipientData(
  schema: yup.ObjectSchema,
  data: object
): Promise<void | {
  message: string;
  errors: {
    path: string;
    message: string;
  }[];
}> {
  try {
    await schema.validate(data, { abortEarly: false });
  } catch (e) {
    const errors = e instanceof yup.ValidationError ? formatYupErrors(e) : [];

    return {
      message: 'Error validating recipient',
      errors,
    };
  }
}
