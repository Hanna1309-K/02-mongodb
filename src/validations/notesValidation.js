import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

export const getAllNotesSchema = {
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().integer().min(1).default(1),

        perPage: Joi.number()
            .integer()
            .min(5)
            .max(20)
            .default(10),

        tag: Joi.string().valid(...TAGS),

        search: Joi.string().allow(''),
    }),
};

export const noteIdSchema = {
    [Segments.PARAMS]: Joi.object().keys({
        noteId: Joi.string()
            .required()
            .custom((value, helpers) => {
                if (!isValidObjectId(value)) {
                    return helpers.message('Invalid noteId format');
                }
                return value;
            }),
    }),
};

export const createNoteSchema = {
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().min(1).required(),

        content: Joi.string().allow(''),

        tag: Joi.string().valid(...TAGS),
    }),
};

export const updateNoteSchema = {
    [Segments.PARAMS]: Joi.object().keys({
        noteId: Joi.string()
            .required()
            .custom((value, helpers) => {
                if (!isValidObjectId(value)) {
                    return helpers.message('Invalid noteId format');
                }
                return value;
            }),
    }),

    [Segments.BODY]: Joi.object()
        .keys({
            title: Joi.string().min(1),

            content: Joi.string().allow(''),

            tag: Joi.string().valid(...TAGS),
        })
        .min(1),
};
