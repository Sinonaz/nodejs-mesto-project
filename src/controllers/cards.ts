import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/appError';
import Card from '../models/card';

export async function getCards(req: Request, res: Response, next: NextFunction) {
  try {
    const cards = await Card.find();

    return res.status(200).send(cards);
  } catch (err) {
    return next(err);
  }
}

export async function deleteCardById(req: Request, res: Response, next: NextFunction) {
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndDelete(cardId);

    if (!card) {
      throw new AppError(404, 'Card not found for deletion');
    }

    return res.status(200).send(card);
  } catch (err) {
    return next(err);
  }
}

export async function createCard(req: Request, res: Response, next: NextFunction) {
  const { name, link } = req.body;

  try {
    const card = await Card.create({ name, link, owner: req.user._id });

    return res.status(201).send(card);
  } catch (err) {
    return next(err);
  }
}

export async function addLike(req: Request, res: Response, next: NextFunction) {
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      throw new AppError(404, 'Card not found for like addition');
    }

    return res.status(200).send(card);
  } catch (err) {
    return next(err);
  }
}

export async function removeLike(req: Request, res: Response, next: NextFunction) {
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      throw new AppError(404, 'Card not found for like removal');
    }

    return res.status(200).send(card);
  } catch (err) {
    return next(err);
  }
}
