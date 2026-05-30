import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { User } from '../models/user.js';
import { Session } from '../models/session.js';
import {
  createSession,
  setSessionCookies,
} from '../services/auth.js';

export const loginUser = async (
  req,
  res,
  next,
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw createHttpError(
        401,
        'Invalid credentials',
      );
    }

    const isPasswordValid =
      await bcrypt.compare(
        password,
        user.password,
      );

    if (!isPasswordValid) {
      throw createHttpError(
        401,
        'Invalid credentials',
      );
    }

    await Session.deleteMany({
      userId: user._id,
    });

    const session = await createSession(
      user._id,
    );

    setSessionCookies(res, session);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};