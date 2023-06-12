import { RequestHandler } from 'express';
import { UserService } from './user.service';
// import { z } from 'zod'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await UserService.createUser(user);

    res.status(200).json({
      success: true,
      message: 'succeeded to create user',
      data: result,
    });
  } catch (error) {
    // res.status(400).json({
    //   success: false,
    //   message: 'failed to create user',
    //   error: error,
    // })
    next(error);
  }
};

export const UserController = { createUser };
