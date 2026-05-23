import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
    const {
        page = 1,
        perPage = 10,
        tag,
        search,
    } = req.query;

    const skip = (page - 1) * perPage;

    let query = Note.find();

    // filter by tag
    if (tag) {
        query = query.where('tag').equals(tag);
    }

    // search in title + content
    if (search) {
        const regex = new RegExp(search, 'i');

        query = query.where({
            $or: [
                { title: regex },
                { content: regex },
            ],
        });
    }

    const totalNotes = await Note.countDocuments(query.getFilter());

    const notes = await query
        .skip(skip)
        .limit(perPage);

    const totalPages = Math.ceil(totalNotes / perPage);

    res.status(200).json({
        page: Number(page),
        perPage: Number(perPage),
        totalNotes,
        totalPages,
        notes,
    });
};

export const getNoteById = async (req, res) => {
    const { noteId } = req.params;

    const note = await Note.findById(noteId);

    if (!note) {
        throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
};

export const createNote = async (req, res) => {
    const note = await Note.create(req.body);
    res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
    const { noteId } = req.params;

    const note = await Note.findByIdAndDelete(noteId);

    if (!note) {
        throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
};

export const updateNote = async (req, res) => {
    const { noteId } = req.params;

    const note = await Note.findByIdAndUpdate(noteId, req.body, {
        returnDocument: 'after',
    });

    if (!note) {
        throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
};