import bcrypt from 'bcryptjs';
import {
  Document, Model, model, Schema,
} from 'mongoose';
import StatusCodes from '../enums/statusCodes';
import AppError from '../errors/appError';

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface IUserModel extends Model<IUser> {
  findByCredentials: (email: string, password: string) => Promise<Document<unknown, any, IUser>>;
}

const userSchema = new Schema<IUser, IUserModel>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.static('findByCredentials', async function findByCredentials(email: string, password: string) {
  const user = await this.findOne({ email }).select('+password');

  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid email or password');
  }

  return user;
});

export default model<IUser, IUserModel>('user', userSchema);
