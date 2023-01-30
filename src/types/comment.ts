import type { IUser } from "./user";

export type Comment = {
  id: number;
  content: string;
  created_time: string;
  mark: number;

  productId: number;

  userId: number;
  user: IUser;
};

export interface CommentCreateOptions
  extends Omit<
    Comment,
    "userId" | "productId" | "id" | "created_time" | "user"
  > {
  userId: number | undefined;
  productId: number | undefined;
}
