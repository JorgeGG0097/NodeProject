import { NextFunction, Request, Response } from 'express';
import { User } from '../models/userModel';
import jwt from "jsonwebtoken";
import { SECRET_KEY } from '../middleware/jwtSecret';

// Function to create a new user
export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const { name, email, password } = req.body;

        // Validate input (you can also use express-validator middleware)
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the email already exists
        const existingUser = await User.getUserByEmail(email);

        // @ts-ignore
        if (existingUser.rowCount > 0) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Create user with hashed password
        const result = await User.createUser(name, email, password);
        const newUser = result.rows[0];

        // Send response
        return res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Error creating user' });
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if the user exists
        const result = await User.getUserByEmail(email);
        if (result.rowCount === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = result.rows[0];

        // Verify the password
        const isPasswordValid = await User.verifyPassword(user.password, password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Create and sign the JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            SECRET_KEY as string,
            { expiresIn: '1h' }
        );

        // Send the token in the response
        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
