import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserInterface } from '../models/userModel';
import { SECRET_KEY } from './jwtSecret';

declare global {
    namespace Express {
        interface Request {
            user?: UserInterface;  // Adding the 'user' property to the Request interface
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as UserInterface;  // Decode and assign the 'User' type
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default verifyToken;
