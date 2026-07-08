import { Router } from 'express';
import { createCard, getCards, deleteCardById } from '../controllers/cards';

const router = Router();

router.delete('/:cardId', deleteCardById);
router.get('/', getCards);
router.post('/', createCard);

export default router;
