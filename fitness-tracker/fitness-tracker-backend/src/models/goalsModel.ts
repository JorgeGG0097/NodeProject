import { QueryResult } from 'pg';
import client from '../db/index';

export interface GoalInterface {
    name: string;
    description: string;
    targetDate: string;
}

export class Goal {
    // Create a new goal
    static async createGoal(name: string, description: string, targetDate: number): Promise<QueryResult> {
        try {
            const query = `
                INSERT INTO goals (name, description, targetDate)
                VALUES ($1, $2, $3) RETURNING *;
            `;
            const values = [name, description, targetDate];
            return client.query(query, values);
        } catch (error) {
            throw new Error('Error while creating goal');
        }
    }

    // Get all goals
    static async getAllGoals(): Promise<QueryResult> {
        const query = 'SELECT * FROM goals;';
        return client.query(query);
    }

    // Get a goal by ID
    static async getGoalById(id: number): Promise<QueryResult> {
        const query = 'SELECT * FROM goals WHERE id = $1;';
        const values = [id];
        return client.query(query, values);
    }

    // Update a goal
    static async updateGoal(id: number, name: string, description: string, targetDate: number): Promise<QueryResult> {
        try {
            const query = `
                UPDATE goals
                SET name = $1, description = $2, targetDate = $3
                WHERE id = $4 RETURNING *;
            `;
            const values = [name, description, targetDate, id];
            return client.query(query, values);
        } catch (error) {
            throw new Error('Error while updating goal');
        }
    }

    // Delete a goal
    static async deleteGoal(id: number): Promise<QueryResult> {
        const query = 'DELETE FROM goals WHERE id = $1 RETURNING *;';
        const values = [id];
        return client.query(query, values);
    }
}
