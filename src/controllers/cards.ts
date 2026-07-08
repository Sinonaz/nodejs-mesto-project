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
  const { name, link } = req.body;

  try {
    const card = await Card.create({ name, link, owner: req.user._id });

    return res.status(201).send(card);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function addLike(req: Request, res: Response) {
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    return res.status(200).send(card);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function removeLike(req: Request, res: Response) {
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    return res.status(200).send(card);
  } catch (err) {
    return res.status(500).send(err);
  }
}
