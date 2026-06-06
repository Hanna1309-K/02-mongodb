import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
    if (err instanceof createHttpError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }
    res.status(500).json({
        message: err.message || 'Server error',
    });
}