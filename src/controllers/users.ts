import { log } from 'console';
import { Request, Response } from 'express';
import User from '../models/user';

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.find();

    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function createUser(req: Request, res: Response) {
  const { name, about, avatar } = req.body;

  try {
    const user = await User.create({ name, about, avatar });

    res.status(201).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function updateUser(req: Request, res: Response) {
  const { name, about } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, { name, about }, { new: true });

    res.status(200).send(updatedUser);
  } catch (err) {
    log(err);
    res.status(500).send(err);
  }
}

export async function updateUserAvatar(req: Request, res: Response) {
  const { avatar } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, { avatar }, { new: true });

    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(500).send({ err });
  }
}
