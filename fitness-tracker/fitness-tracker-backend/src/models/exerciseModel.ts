import { QueryResult } from 'pg';
import client from '../db/index';

export class Exercise {
    // Create a new exercise
    static async createExercise(name: string, description: string, category: string): Promise<QueryResult> {
        const query = `
      INSERT INTO exercises (name, description, category)
      VALUES ($1, $2, $3) RETURNING *;
    `;
        const values = [name, description, category];
        return client.query(query, values);
    }

    // Get all exercises
    static async getAllExercises(): Promise<QueryResult> {
        const query = `SELECT * FROM exercises`;
        return client.query(query);
    }

    // Get a specific exercise by ID
    static async getExerciseById(id: number): Promise<QueryResult> {
        const query = `SELECT * FROM exercises WHERE id = $1`;
        const values = [id];
        return client.query(query, values);
    }

    // Update an exercise by ID
    static async updateExercise(id: number, name: string, description: string, category: string): Promise<QueryResult> {
        const query = `
      UPDATE exercises
      SET name = $1, description = $2, category = $3, updated_at = CURRENT_TIMESTAMP
      WHERE id = $4 RETURNING *;
    `;
        const values = [name, description, category, id];
        return client.query(query, values);
    }

    // Delete an exercise by ID
    static async deleteExercise(id: number): Promise<QueryResult> {
        const query = `DELETE FROM exercises WHERE id = $1 RETURNING *;`;
        const values = [id];
        return client.query(query, values);
    }
}
