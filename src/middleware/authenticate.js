import createHttpError from 'http-errors';

import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
    try {
        const { accessToken, sessionId } = req.cookies;

        // 1. перевірка accessToken
        if (!accessToken) {
            throw createHttpError(401, 'Missing access token');
        }

        // 2. перевірка sessionId
        if (!sessionId) {
            throw createHttpError(401, 'Session not found');
        }

        // 3. шукаємо сесію ПО ДВОХ ПОЛЯХ
        const session = await Session.findOne({
            _id: sessionId,
            accessToken,
        });

        if (!session) {
            throw createHttpError(401, 'Session not found');
        }

        // 4. перевірка expiry access token
        if (new Date() > session.accessTokenValidUntil) {
            throw createHttpError(401, 'Access token expired');
        }

        // 5. перевірка користувача
        const user = await User.findById(session.userId);

        if (!user) {
            throw createHttpError(401);
        }

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};