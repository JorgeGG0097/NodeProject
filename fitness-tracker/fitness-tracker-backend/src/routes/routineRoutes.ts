import express from 'express';
import * as RoutineController from '../controllers/routineController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Routine
 *     description: Operations related to exercise routines
 */

/**
 * @swagger
 * /api/routines/create:
 *   post:
 *     summary: Create a new exercise session (routine)
 *     description: This endpoint allows users to create a new exercise session by providing the user ID, exercise ID, sets, repetitions, duration, and goal ID.
 *     tags: [Routine]
 *     security:
 *       - bearerAuth: []  # Requiere token JWT para esta ruta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user for whom the exercise session is being created.
 *               exercise_id:
 *                 type: integer
 *                 description: The ID of the exercise being performed in the session.
 *               sets:
 *                 type: integer
 *                 description: The number of sets for the exercise.
 *               repetitions:
 *                 type: integer
 *                 description: The number of repetitions per set.
 *               duration:
 *                 type: integer
 *                 description: The duration of the exercise session (in seconds).
 *               goal_id:
 *                 type: integer
 *                 description: The ID of the goal associated with the session.
 *     responses:
 *       200:
 *         description: Exercise session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 exercise_id:
 *                   type: integer
 *                 sets:
 *                   type: integer
 *                 repetitions:
 *                   type: integer
 *                 duration:
 *                   type: integer
 *                 goal_id:
 *                   type: integer
 *       500:
 *         description: Failed to create exercise session
 */
router.post('/create', RoutineController.createExerciseSession);

/**
 * @swagger
 * /api/routines/user/{userId}:
 *   get:
 *     summary: Get all sessions for a specific user
 *     description: Fetch all exercise sessions for a specific user from the database.
 *     tags: [Routine]
 *     security:
 *       - bearerAuth: []  # Requiere token JWT para esta ruta
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user for whom the exercise sessions are to be fetched.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of sessions for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   exercise_id:
 *                     type: integer
 *                   sets:
 *                     type: integer
 *                   repetitions:
 *                     type: integer
 *                   duration:
 *                     type: integer
 *                   goal_id:
 *                     type: integer
 *       500:
 *         description: Failed to fetch sessions for the user
 */
router.get('/user/:userId', RoutineController.getSessionsByUser);

/**
 * @swagger
 * /api/routines/exercise/{exerciseId}:
 *   get:
 *     summary: Get all sessions for a specific exercise
 *     description: Fetch all exercise sessions for a specific exercise from the database.
 *     tags: [Routine]
 *     security:
 *       - bearerAuth: []  # Requiere token JWT para esta ruta
 *     parameters:
 *       - in: path
 *         name: exerciseId
 *         required: true
 *         description: The ID of the exercise for which the sessions are to be fetched.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of sessions for the exercise
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   exercise_id:
 *                     type: integer
 *                   sets:
 *                     type: integer
 *                   repetitions:
 *                     type: integer
 *                   duration:
 *                     type: integer
 *                   goal_id:
 *                     type: integer
 *       500:
 *         description: Failed to fetch sessions for this exercise
 */
router.get('/exercise/:exerciseId', RoutineController.getSessionById);

/**
 * @swagger
 * /api/routines/{id}:
 *   get:
 *     summary: Get a single exercise session by ID
 *     description: Fetch a specific exercise session using its ID.
 *     tags: [Routine]
 *     security:
 *       - bearerAuth: []  # Requiere token JWT para esta ruta
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the exercise session to fetch.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exercise session details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 exercise_id:
 *                   type: integer
 *                 sets:
 *                   type: integer
 *                 repetitions:
 *                   type: integer
 *                 duration:
 *                   type: integer
 *                 goal_id:
 *                   type: integer
 *       404:
 *         description: Exercise session not found
 *       500:
 *         description: Failed to fetch session
 */
router.get('/:id', RoutineController.getSessionById);

/**
 * @swagger
 * /api/routines/{id}:
 *   put:
 *     summary: Update an exercise session
 *     description: Update an existing exercise session using its ID, with the new sets, repetitions, duration, and goal ID.
 *     tags: [Routine]
 *     security:
 *       - bearerAuth: []  # Requiere token JWT para esta ruta
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the exercise session to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sets:
 *                 type: integer
 *                 description: The number of sets for the exercise.
 *               repetitions:
 *                 type: integer
 *                 description: The number of repetitions per set.
 *               duration:
 *                 type: integer
 *                 description: The duration of the exercise session (in seconds).
 *               goal_id:
 *                 type: integer
 *                 description: The ID of the goal associated with the session.
 *     responses:
 *       200:
 *         description: Exercise session updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 exercise_id:
 *                   type: integer
 *                 sets:
 *                   type: integer
 *                 repetitions:
 *                   type: integer
 *                 duration:
 *                   type: integer
 *                 goal_id:
 *                   type: integer
 *       500:
 *         description: Failed to update session
 */
router.put('/:id', RoutineController.updateExerciseSession);

/**
 * @swagger
 * /api/routines/{id}:
 *   delete:
 *     summary: Delete an exercise session
 *     description: Delete a specific exercise session using its ID.
 *     tags: [Routine]
 *     security:
 *       - bearerAuth: []  # Requiere token JWT para esta ruta
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the exercise session to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exercise session deleted successfully
 *       500:
 *         description: Failed to delete session
 */
router.delete('/:id', RoutineController.deleteExerciseSession);

export { router as routineRoutes };
