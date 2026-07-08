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
