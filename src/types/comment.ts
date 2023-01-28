import type { IUser } from "./user";

export interface IComment {
  id: number;
  content: string;
  created_time: string;
  mark: number;
  user: IUser;
}
