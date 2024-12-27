import express from 'express';
import * as UserController from '../controllers/userController';
import { body, validationResult } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Endpoints related to user management, including creating users and fetching user details.
 */

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with name, email, and password.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user (required)
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 description: The user's email (required)
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: The user's password (required, at least 6 characters)
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the created user
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "john.doe@example.com"
 *       400:
 *         description: Bad request due to invalid input (e.g., invalid email format, missing fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: "Name is required"
 *                       param:
 *                         type: string
 *                         example: "name"
 *                       location:
 *                         type: string
 *                         example: "body"
 *       500:
 *         description: Internal server error
 */
router.post(
    '/create',
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    // @ts-ignore
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },

    // @ts-ignore
    UserController.createUser
);


/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     description: Allows a user to log in with their email and password, returning a JWT token if successful.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email (required)
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: The user's password (required)
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successful login, returns a JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for the user
 *                   example: "your_jwt_token_here"
 *       400:
 *         description: Bad request due to invalid credentials or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid email or password"
 *       500:
 *         description: Internal server error
 */
router.post('/login',
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),

    // @ts-ignore
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },

    // @ts-ignore
    UserController.loginUser
);

export { router as userRoutes };
