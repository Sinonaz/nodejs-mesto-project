import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/appError';
import User from '../models/user';
import StatusCodes from '../enums/statusCodes';

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await User.find();

    return res.status(StatusCodes.OK).send(users);
  } catch (err) {
    return next(err);
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    }

    return res.status(StatusCodes.OK).send(user);
  } catch (err) {
    return next(err);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  const { name, about, avatar } = req.body;

  try {
    const user = await User.create({ name, about, avatar });

    return res.status(StatusCodes.CREATED).send(user);
  } catch (err) {
    return next(err);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  const { name, about } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, { name, about }, { new: true });

    if (!updatedUser) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found for update');
    }

    return res.status(StatusCodes.UPDATED).send(updatedUser);
  } catch (err) {
    return next(err);
  }
}

export async function updateUserAvatar(req: Request, res: Response, next: NextFunction) {
  const { avatar } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, { avatar }, { new: true });

    if (!updatedUser) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found for avatar update');
    }

    return res.status(StatusCodes.UPDATED).send(updatedUser);
  } catch (err) {
    return next(err);
  }
}
