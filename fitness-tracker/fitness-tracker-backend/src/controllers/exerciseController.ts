import { Request, Response } from 'express';
import { Exercise } from '../models/exerciseModel';

// Function to create an exercise
export const createExercise = async (req: Request, res: Response) => {
    const { name, description, category } = req.body;
    try {
        const result = await Exercise.createExercise(name, description, category);
        res.json(result.rows[0]); // Returns the newly created exercise
    } catch (error) {
        res.status(500).json({ error: 'Failed to create exercise' });
    }
};

// Function to get all exercises
export const getAllExercises = async (req: Request, res: Response) => {
    try {
        const result = await Exercise.getAllExercises();
        res.json(result.rows); // Returns all exercises
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch exercises' });
    }
};

// Function to get an exercise by ID
export const getExerciseById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const result = await Exercise.getExerciseById(id);
        if (result.rows.length > 0) {
            res.json(result.rows[0]); // Returns the found exercise
        } else {
            res.status(404).json({ error: 'Exercise not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch exercise' });
    }
};

// Function to update an exercise
export const updateExercise = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name, description, category } = req.body;
    try {
        const result = await Exercise.updateExercise(id, name, description, category);
        res.json(result.rows[0]); // Returns the updated exercise
    } catch (error) {
        res.status(500).json({ error: 'Failed to update exercise' });
    }
};

// Function to delete an exercise
export const deleteExercise = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const result = await Exercise.deleteExercise(id);
        res.json({ message: 'Exercise deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete exercise' });
    }
};
