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
    try {
        // connect DB
        await connectMongoDB();

        // middleware
        app.use(logger);
        app.use(cors({
            origin: true,
            credentials: true,
        }));
        app.use(express.json());

        // routes
        app.use('/auth', authRouter);
        app.use(notesRoutes);

        // errors from celebrate
        app.use(errors());

        // 404
        app.use(notFoundHandler);

        // global error handler
        app.use(errorHandler);

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
