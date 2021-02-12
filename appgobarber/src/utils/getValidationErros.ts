import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErros(error: ValidationError): Errors {
  const validationErros: Errors = {};

  error.inner.forEach(err => {
    if (err.path) {
      // eslint-disable-next-line prefer-destructuring
      validationErros[err.path] = err.errors[0];
    }
  });
  return validationErros;
}
