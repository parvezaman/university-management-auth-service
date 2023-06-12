import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';

export const createUser = async (user: IUser): Promise<IUser | null> => {
  /* 
    we need: 
    ------------
    1. auto generated incremental student id
    2. default password

  */
  // 1. auto generated incremental student id
  const id = await generateUserId();

  user.id = id;

  // 2. default password
  if (!user.password) {
    user.password = config.default_user_password as string;
  }

  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user!');
  }

  return createdUser;
};

export const UserService = {
  createUser,
};
