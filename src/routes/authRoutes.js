import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import {
    registerUser,
    loginUser,
    logoutUser,
    refreshUserSession,
    resetPassword,
} from '../controllers/authController.js';

import {
    registerUserSchema,
    loginUserSchema,
    resetPasswordSchema,
} from '../validations/authValidation.js';

const router = Router();

router.post(
    '/register',
    celebrate({
        [Segments.BODY]: registerUserSchema,
    }),
    registerUser,
);

router.post(
    '/login',
    celebrate({
        [Segments.BODY]: loginUserSchema,
    }),
    loginUser,
);

router.post('/refresh', refreshUserSession);

router.post('/logout', logoutUser);

router.post(
    '/reset-password',
    celebrate({
        [Segments.BODY]: resetPasswordSchema,
    }),
    resetPassword,
);
export default router;
