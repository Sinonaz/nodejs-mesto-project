import { Request, Response } from 'express';
import Card from '../models/card';

export async function getCards(req: Request, res: Response) {
  try {
    const cards = await Card.find();

    return res.status(200).send(cards);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function deleteCardById(req: Request, res: Response) {
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndDelete(cardId);

    return res.status(200).send(card);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function createCard(req: Request, res: Response) {
  const { name, link, user } = req.body;

  try {
    const card = await Card.create({ name, link, owner: user._id });

    return res.status(201).send(card);
  } catch (err) {
    return res.status(500).send(err);
  }
}
