import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';

import {
    getAllNotes,
    getNoteById,
    createNote,
    deleteNote,
    updateNote,
} from '../controllers/notesController.js';

import {
    getAllNotesSchema,
    noteIdSchema,
    createNoteSchema,
    updateNoteSchema,
} from '../validations/notesValidation.js';

const router = Router();

router.use(authenticate);
// GET /notes
router.get(
    '/notes',
    celebrate(getAllNotesSchema),
    getAllNotes
);

// GET /notes/:noteId
router.get(
    '/notes/:noteId',
    celebrate(noteIdSchema),
    getNoteById
);

// POST /notes
router.post(
    '/notes',
    celebrate(createNoteSchema),
    createNote
);

// DELETE /notes/:noteId
router.delete(
    '/notes/:noteId',
    celebrate(noteIdSchema),
    deleteNote
);

// PATCH /notes/:noteId
router.patch(
    '/notes/:noteId',
    celebrate(updateNoteSchema),
    updateNote
);

export default router;