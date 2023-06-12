import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

export const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

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

export const User = model<IUser, UserModel>('User', userSchema);
