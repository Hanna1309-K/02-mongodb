import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errors } from 'celebrate';

import notesRoutes from './routes/notesRoutes.js';
import authRouter from './routes/authRoutes.js';

import { connectMongoDB } from './db/connectMongoDB.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

const startServer = async () => {
    await connectMongoDB();

    app.use(logger);
    app.use(cors());
    app.use(express.json());

    app.use('/auth', authRouter);
    app.use(notesRoutes);

    app.use(errors());

    app.use(notFoundHandler);

    app.use(errorHandler);

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
