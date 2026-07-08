import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getUsers, getUserById, createUser, updateUserAvatar, updateUser,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/:id', celebrate({
  params: {
    id: Joi.string().alphanum().length(24).required(),
  },
}), getUserById);
router.post('/', celebrate({
  body: {
    name: Joi.string().required(),
    about: Joi.string().required(),
    avatar: Joi.string().required(),
  },
}), createUser);
router.patch('/me', celebrate({
  body: {
    name: Joi.string(),
    about: Joi.string(),
  },
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: {
    avatar: Joi.string().required(),
  },
}), updateUserAvatar);

export default router;
