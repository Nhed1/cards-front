export interface AuthInputs {
  email: string;
  password: string;
}

export type OnSubmit = (formValues: AuthInputs) => void;
