import { ValidationError } from 'yup';

export default function formatYupErrors(errors: ValidationError) {
  return errors.inner.map(({ message, path }) => ({
    path,
    message,
  }));
}
