export interface LoginFormValueInterface {
  email: string;
  password: string;
}

export interface SignupFormValueInterface extends LoginFormValueInterface {
  displayName: string;
}
