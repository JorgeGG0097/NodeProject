import { Request, Response } from 'express';
import { ExerciseSession } from "../models/routineModel";

// Function to create a new exercise session
export const createExerciseSession = async (req: Request, res: Response) => {
    const { user_id, exercise_id, sets, repetitions, duration, goal_id } = req.body;
    try {
        const result = await ExerciseSession.createExerciseSession(
            user_id, exercise_id, sets, repetitions, duration, goal_id
        );
        res.status(200).json(result.rows[0]); // Return the newly created exercise session
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create exercise session' });
    }
};

// Function to get all exercise sessions for a specific user
export const getSessionsByUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    try {
        const result = await ExerciseSession.getSessionsByUser(userId);
        res.status(200).json(result.rows); // Return all sessions for the user
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch sessions for the user' });
    }
};

// Function to get all exercise sessions for a specific exercise
export const getSessionsByExercise = async (req: Request, res: Response) => {
    const exerciseId = parseInt(req.params.exerciseId);
    try {
        const result = await ExerciseSession.getSessionsByExercise(exerciseId);
        res.status(200).json(result.rows); // Return all sessions for the specific exercise
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch sessions for this exercise' });
    }
};

// Function to get a specific exercise session by ID
export const getSessionById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const result = await ExerciseSession.getSessionById(id);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]); // Return the exercise session by ID
        } else {
            res.status(404).json({ error: 'Session not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch session' });
    }
};

// Function to update an exercise session
export const updateExerciseSession = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { sets, repetitions, duration, goal_id } = req.body;
    try {
        const result = await ExerciseSession.updateExerciseSession(id, sets, repetitions, duration, goal_id);
        res.status(200).json(result.rows[0]); // Return the updated exercise session
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update session' });
    }
};

// Function to delete an exercise session
export const deleteExerciseSession = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        await ExerciseSession.deleteExerciseSession(id);
        res.status(200).json({ message: 'Exercise session deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete session' });
    }
};