import { Model } from 'mongoose';

export type IUser = {
  id: string;
  role: string;
  password: string;
};

/* 
User
-----------
Id
role
Password
createdAt
updatedAt
studentId || adminId || facultyId

*/

// type UserModel = Model<IUser, object>
export type UserModel = Model<IUser, Record<string, unknown>>;
