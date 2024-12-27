import { QueryResult } from 'pg';
import client from '../db/index';
import bcrypt from 'bcrypt';

// Interface for the User data type
export interface UserInterface {
    id: number;
    name: string;
    email: string;
    password: string;
}

export class User {
    static async createUser(name: string, email: string, password: string): Promise<QueryResult> {
        try {
            // Hash the password before saving it
            const hashedPassword = await bcrypt.hash(password, 10);  // The '10' is the number of salting rounds

            const query = `
                INSERT INTO users (name, email, password)
                VALUES ($1, $2, $3) RETURNING *;
            `;
            const values = [name, email, hashedPassword];
            return client.query(query, values);
        } catch (error) {
            throw new Error('Error while hashing password or creating user');
        }
    }

    // Get a user by their email
    static async getUserByEmail(email: string): Promise<QueryResult> {
        const query = `
      SELECT * FROM users WHERE email = $1;
    `;
        const values = [email];
        return client.query(query, values);
    }

    // Verify if the password is correct
    static async verifyPassword(storedPassword: string, enteredPassword: string): Promise<boolean> {
        try {
            // Compare the plain-text password with the stored hash
            return await bcrypt.compare(enteredPassword, storedPassword);
        } catch (error) {
            throw new Error('Error verifying password');
        }
    }
}
