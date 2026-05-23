import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import notesRoutes from './routes/notesRoutes.js';

import { connectMongoDB } from './db/connectMongoDB.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

const startServer = async () => {
    // 1. Підключення до MongoDB ПЕРЕД запуском сервера
    await connectMongoDB();

    // 2. Middleware
    app.use(logger);
    app.use(cors());
    app.use(express.json());

    // 3. Роути
    app.use(notesRoutes);
    // celebrate validation errors
    app.use(errors());

    // 4. 404 middleware (після всіх роутів)
    app.use(notFoundHandler);

    // 5. error handler (останній)
    app.use(errorHandler);

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();