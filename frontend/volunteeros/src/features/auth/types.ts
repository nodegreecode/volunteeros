export type Role = "ROLE_VOLUNTEER" | "ROLE_ORGANIZATION" | "ROLE_ADMIN";

export interface RegisterRequestPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface SignupFormValues extends RegisterRequestPayload {
  passwordConfirmation: string;
}
