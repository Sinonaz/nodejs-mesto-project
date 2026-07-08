import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/appError';
import User from '../models/user';

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await User.find();

    return res.status(200).send(users);
  } catch (err) {
    return next(err);
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  const { name, about, avatar } = req.body;

  try {
    const user = await User.create({ name, about, avatar });

    return res.status(201).send(user);
  } catch (err) {
    return next(err);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  const { name, about } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, { name, about }, { new: true });

    if (!updatedUser) {
      throw new AppError(404, 'User not found for update');
    }

    return res.status(200).send(updatedUser);
  } catch (err) {
    return next(err);
  }
}

export async function updateUserAvatar(req: Request, res: Response, next: NextFunction) {
  const { avatar } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, { avatar }, { new: true });

    if (!updatedUser) {
      throw new AppError(404, 'User not found for avatar update');
    }

    return res.status(200).send(updatedUser);
  } catch (err) {
    return next(err);
  }
}
