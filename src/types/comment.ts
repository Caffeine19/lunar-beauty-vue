import type { IUser } from "./user";

export interface IComment {
  id: number;
  content: string;
  created_time: string;
  rank: number;
  user: IUser;
}
