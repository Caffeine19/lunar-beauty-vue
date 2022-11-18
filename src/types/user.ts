export interface IUser {
  id: number;
  name: string;
  password: string;
  avatar: string;
  phone?: string;
  email?: string;
  gender: string;
}
export interface IUserUpdateOptions {
  name?: string;
  password?: string;
  avatar?: string;
  phone?: string;
  email?: string;
  gender?: string;
}
export type IUserEditingStatus = {
  [key in keyof IUserUpdateOptions]: boolean;
};
