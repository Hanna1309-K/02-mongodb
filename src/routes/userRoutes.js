import { Router } from 'express';

import { updateUserAvatar } from '../controllers/userController.js';
import { upload } from '../middlewares/multer.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.patch(
    '/me/avatar',
    authenticate,
    upload.single('avatar'),
    updateUserAvatar,
);

export default router;