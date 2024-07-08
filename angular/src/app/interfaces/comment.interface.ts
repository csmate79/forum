import { IUser } from './user.interface';

export interface IComment {
  id: string;
  body: string;
  author: IUser;
  comments: Comment[];
  removed?: boolean;
}
