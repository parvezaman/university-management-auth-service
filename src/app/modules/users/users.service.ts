import config from '../../../config/index'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

export const createUser = async (user: IUser): Promise<IUser | null> => {
  /* 
    we need: 
    ------------
    1. auto generated incremental student id
    2. default password

  */
  // 1. auto generated incremental student id
  const id = await generateUserId()

  user.id = id

  // 2. default password
  if (!user.password) {
    user.password = config.default_user_password as string
  }

  const createdUser = await User.create(user)

  if (!createUser) {
    throw new Error('Failed to create user!')
  }

  return createdUser
}

export default {
  createUser,
}
