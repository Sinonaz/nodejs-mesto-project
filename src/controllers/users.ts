import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

export async function getCurrentUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    }

    return res.status(StatusCodes.OK).send(user);
  } catch (err) {
    return next(err);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  const {
    name, about, avatar, email, password,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hashedPassword,
    });

    return res.status(StatusCodes.CREATED).send(user);
  } catch (err) {
    return next(err);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  const { name, about } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedUser) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found for update');
    }

    return res.status(StatusCodes.OK).send(updatedUser);
  } catch (err) {
    return next(err);
  }
}

export async function updateUserAvatar(req: Request, res: Response, next: NextFunction) {
  const { avatar } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedUser) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found for avatar update');
    }

    return res.status(StatusCodes.OK).send(updatedUser);
  } catch (err) {
    return next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);

    if (!user) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET ?? 'secret-key',
      { expiresIn: '7d' },
    );

    return res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }).status(StatusCodes.OK).send(user);
  } catch (err) {
    return next(err);
  }
}
