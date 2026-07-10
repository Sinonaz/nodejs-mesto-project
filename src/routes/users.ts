import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getUsers, getUserById, updateUserAvatar, updateUser, getCurrentUser,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', celebrate({
  params: {
    userId: Joi.string().alphanum().length(24).required(),
  },
}), getUserById);
router.get('/me', getCurrentUser);
router.patch('/me', celebrate({
  body: {
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required(),
  },
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: {
    avatar: Joi.string().required(),
  },
}), updateUserAvatar);

export default router;
