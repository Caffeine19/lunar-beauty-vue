export interface IUser {
  id: number;
  name: string;
  password: string;
  avatar: string;
  phone?: String;
  email?: String;
  gender: String;
}
export interface IUserUpdateOptions {
  name?: string;
  password?: string;
  avatar?: string;
  phone?: String;
  email?: String;
  gender?: String;
}
