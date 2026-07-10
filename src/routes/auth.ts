import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  createUser, login,
} from '../controllers/users';

const router = Router();

router.post('/signup', celebrate({
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().uri(),
  },
}), createUser);
router.post('/signin', celebrate({
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  },
}), login);

export default router;
