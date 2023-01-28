export type IUser = {
  id: number;
  name: string;
  password: string;
  avatar: string;
  phone?: string;
  email?: string;
  gender: string;
};
// export interface IUserUpdateOptions {
//   name?: string;
//   password?: string;
//   avatar?: string;
//   phone?: string;
//   email?: string;
//   gender?: string;
// }
export type IUserUpdateOptions = Pick<
  IUser,
  "name" | "password" | "avatar" | "phone" | "email" | "gender"
>;
export type IUserEditingStatus = {
  [key in keyof IUserUpdateOptions]: boolean;
};
