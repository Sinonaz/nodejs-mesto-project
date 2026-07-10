import { Request, Response, NextFunction } from 'express';
import StatusCodes from '../enums/statusCodes';
import AppError from '../errors/appError';
import Card from '../models/card';

export async function getCards(req: Request, res: Response, next: NextFunction) {
  try {
    const cards = await Card.find();

    return res.status(StatusCodes.OK).send(cards);
  } catch (err) {
    return next(err);
  }
}

export async function deleteCardById(req: Request, res: Response, next: NextFunction) {
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndDelete(cardId);

    if (!card) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Card not found for deletion');
    }

    if (card.owner.toString() !== req.user._id.toString()) {
      throw new AppError(StatusCodes.FORBIDDEN, 'You are not allowed to delete this card');
    }

    return res.status(StatusCodes.OK).send(card);
  } catch (err) {
    return next(err);
  }
}

export async function createCard(req: Request, res: Response, next: NextFunction) {
  const { name, link } = req.body;

  try {
    const card = await Card.create({ name, link, owner: req.user._id });

    return res.status(StatusCodes.CREATED).send(card);
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
      throw new AppError(StatusCodes.NOT_FOUND, 'Card not found for like addition');
    }

    return res.status(StatusCodes.OK).send(card);
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
      throw new AppError(StatusCodes.NOT_FOUND, 'Card not found for like removal');
    }

    return res.status(StatusCodes.OK).send(card);
  } catch (err) {
    return next(err);
  }
}
