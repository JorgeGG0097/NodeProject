import { Request, Response } from 'express';
import { Goal } from "../models/goalsModel";

// Function to create a new goal
export const createGoal = async (req: Request, res: Response) => {
    const { name, description, targetDate } = req.body;
    try {
        const result = await Goal.createGoal(name, description, targetDate);
        res.status(200).json(result.rows[0]); // Returns the newly created goal
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create goal' });
    }
};

// Function to get all goals
export const getAllGoals = async (req: Request, res: Response) => {
    try {
        const result = await Goal.getAllGoals();
        res.status(200).json(result.rows); // Returns all goals
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch goals' });
    }
};

// Function to get a specific goal by ID
export const getGoalById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const result = await Goal.getGoalById(id);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]); // Returns the goal by ID
        } else {
            res.status(404).json({ error: 'Goal not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch goal' });
    }
};

// Function to update a goal
export const updateGoal = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name, description, target } = req.body;
    try {
        const result = await Goal.updateGoal(id, name, description, target);
        res.status(200).json(result.rows[0]); // Returns the updated goal
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update goal' });
    }
};

// Function to delete a goal
export const deleteGoal = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        await Goal.deleteGoal(id);
        res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete goal' });
    }
};
