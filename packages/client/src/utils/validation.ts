import * as yup from "yup";

export function validateMail(email: string): boolean {
  return yup
    .string()
    .email()
    .isValidSync(email);
}

export function validatePassword(password: string): boolean {
  return yup
    .string()
    .min(3)
    .isValidSync(password);
}
