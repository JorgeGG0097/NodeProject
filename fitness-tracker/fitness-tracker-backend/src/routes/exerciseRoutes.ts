// src/routes/exerciseRoutes.ts
import express from 'express';
import * as ExerciseController from '../controllers/exerciseController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Exercise
 *     description: Operations related to exercises
 */

/**
 * @swagger
 * /api/exercises/create:
 *   post:
 *     summary: Create a new exercise
 *     description: This endpoint allows users to create a new exercise by providing its name, description, and category.
 *     tags: [Exercise]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the exercise.
 *               description:
 *                 type: string
 *                 description: A description of the exercise.
 *               category:
 *                 type: string
 *                 description: The category of the exercise (e.g., strength, cardio).
 *     responses:
 *       200:
 *         description: Exercise created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 category:
 *                   type: string
 *       500:
 *         description: Failed to create exercise
 */
router.post('/create', ExerciseController.createExercise);

/**
 * @swagger
 * /api/exercises:
 *   get:
 *     summary: Get all available exercises
 *     description: Fetch a list of all available exercises from the database.
 *     tags: [Exercise]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exercises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   category:
 *                     type: string
 *                   description:
 *                     type: string
 *       500:
 *         description: Failed to fetch exercises
 */
router.get('/', ExerciseController.getAllExercises);

/**
 * @swagger
 * /api/exercises/{id}:
 *   get:
 *     summary: Get a single exercise by ID
 *     description: Fetch a single exercise by its ID from the database.
 *     tags: [Exercise]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the exercise to fetch.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exercise found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 category:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Exercise not found
 *       500:
 *         description: Failed to fetch exercise
 */
router.get('/:id', ExerciseController.getExerciseById);

/**
 * @swagger
 * /api/exercises/{id}:
 *   put:
 *     summary: Update an exercise
 *     description: Update the name, description, and category of an existing exercise by its ID.
 *     tags: [Exercise]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the exercise to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Exercise updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 category:
 *                   type: string
 *       400:
 *         description: Invalid data provided
 *       404:
 *         description: Exercise not found
 *       500:
 *         description: Failed to update exercise
 */
router.put('/:id', ExerciseController.updateExercise);

/**
 * @swagger
 * /api/exercises/{id}:
 *   delete:
 *     summary: Delete an exercise
 *     description: Delete an exercise from the database by its ID.
 *     tags: [Exercise]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the exercise to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exercise deleted successfully
 *       404:
 *         description: Exercise not found
 *       500:
 *         description: Failed to delete exercise
 */
router.delete('/:id', ExerciseController.deleteExercise);

export { router as exerciseRoutes };
