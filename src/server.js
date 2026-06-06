import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';

import notesRoutes from './routes/notesRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

import { connectMongoDB } from './db/connectMongoDB.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

const startServer = async () => {
    try {
        console.log('🚀 SERVER STARTING...');

        await connectMongoDB();

        console.log('✅ MongoDB connected');

        // middleware
        app.use(logger);
        app.use(cors({
            origin: true,
            credentials: true,
        }));
        app.use(express.json());
        app.use(cookieParser());

        // routes
        app.use('/auth', authRouter);
        app.use('/users', userRouter);
        app.use(notesRoutes);

        app.get('/', (req, res) => {
            res.status(200).json({
                message: 'API is running',
            });
        });

        // 404
        app.use(notFoundHandler);

        // celebrate errors
        app.use(errors());

        // global error handler
        app.use(errorHandler);

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`🔥 Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('❌ STARTUP ERROR:', error);
        process.exit(1);
    }
};

startServer();