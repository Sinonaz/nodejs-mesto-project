import { Router } from 'express';
import {
  createCard, getCards, deleteCardById, addLike, removeLike,
} from '../controllers/cards';

const router = Router();

router.delete('/:cardId', deleteCardById);
router.get('/', getCards);
router.post('/', createCard);
router.put('/:cardId/likes', addLike);
router.delete('/:cardId/likes', removeLike);

export default router;
