import { QueryResult } from 'pg';
import client from '../db/index';

export class ExerciseSession {
    // Create a new exercise session
    static async createExerciseSession(
        user_id: number,
        exercise_id: number,
        sets: number,
        repetitions: number,
        duration: number, // for cardio exercises
        goal_id: number | null
    ): Promise<QueryResult> {
        const query = `
      INSERT INTO exercise_sessions (user_id, exercise_id, sets, repetitions, duration, goal_id)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
        const values = [user_id, exercise_id, sets, repetitions, duration, goal_id];
        return client.query(query, values);
    }

    // Get all sessions for a specific user
    static async getSessionsByUser(user_id: number): Promise<QueryResult> {
        const query = `
      SELECT * FROM exercise_sessions
      WHERE user_id = $1
      ORDER BY session_date DESC;
    `;
        const values = [user_id];
        return client.query(query, values);
    }

    // Get all sessions for a specific exercise
    static async getSessionsByExercise(exercise_id: number): Promise<QueryResult> {
        const query = `
      SELECT * FROM exercise_sessions
      WHERE exercise_id = $1
      ORDER BY session_date DESC;
    `;
        const values = [exercise_id];
        return client.query(query, values);
    }

    // Get a specific session by ID
    static async getSessionById(id: number): Promise<QueryResult> {
        const query = `SELECT * FROM exercise_sessions WHERE id = $1`;
        const values = [id];
        return client.query(query, values);
    }

    // Update an existing exercise session
    static async updateExerciseSession(
        id: number,
        sets: number,
        repetitions: number,
        duration: number,
        goal_id: number | null
    ): Promise<QueryResult> {
        const query = `
      UPDATE exercise_sessions
      SET sets = $1, repetitions = $2, duration = $3, goal_id = $4, updated_at = CURRENT_TIMESTAMP
      WHERE id = $5 RETURNING *;
    `;
        const values = [sets, repetitions, duration, goal_id, id];
        return client.query(query, values);
    }

    // Delete an exercise session by ID
    static async deleteExerciseSession(id: number): Promise<QueryResult> {
        const query = `DELETE FROM exercise_sessions WHERE id = $1 RETURNING *;`;
        const values = [id];
        return client.query(query, values);
    }
}
