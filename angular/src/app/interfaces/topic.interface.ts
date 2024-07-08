import { IComment } from './comment.interface';
import { IUser } from './user.interface';

export interface ITopic {
  id: string;
  author: IUser;
  title: string;
  body: string;
  comments: IComment[];
}
