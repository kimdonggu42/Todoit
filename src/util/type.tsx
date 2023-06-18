export interface LoginFormValueInterface {
  email: string;
  password: string;
}

export interface SignupFormValueInterface extends LoginFormValueInterface {
  displayName: string;
}

export interface MainTabArrInterface {
  name: string;
}

export interface AuthReducerActionInterface {
  type: string;
  payload: object;
}

export interface Test {
  createdTime: object;
  id: string;
  isCheck: boolean;
  isImportant: boolean;
  todoBody: string;
  todoDate: string;
  uid: string;
}
