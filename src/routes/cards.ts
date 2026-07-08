import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import {
  createCard, getCards, deleteCardById, addLike, removeLike,
} from '../controllers/cards';

const router = Router();

router.delete('/:cardId', celebrate({
  params: {
    cardId: Joi.string().alphanum().length(24).required(),
  },
}), deleteCardById);
router.get('/', getCards);
router.post('/', celebrate({
  body: {
    name: Joi.string().required(),
    link: Joi.string().required(),
  },
}), createCard);
router.put('/:cardId/likes', celebrate({
  params: {
    cardId: Joi.string().alphanum().length(24).required(),
  },
}), addLike);
router.delete('/:cardId/likes', celebrate({
  params: {
    cardId: Joi.string().alphanum().length(24).required(),
  },
}), removeLike);

export default router;
