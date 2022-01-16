import { IUser } from './user';

export interface IMail {
  _id: string;
  subject: string;
  message: string;
  sentBy: IUser;
  receivedBy: IUser;
  read: boolean;
}
