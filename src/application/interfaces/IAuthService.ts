// Tipo base común
export interface IUserBase {
  email: string;
}

export interface IRegisterUser extends IUserBase {
  name: string;
  password: string;
}

export interface ILoginUser extends IUserBase {
  password: string;
}
