import { Router } from 'express';
import * as goalsController from '../controllers/goalsController';
const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Goals
 *     description: Endpoints related to managing exercise goals. This includes creating, updating, retrieving, and deleting goals in the system.
 */

/**
 * @swagger
 * /api/goals/create:
 *   post:
 *     summary: Create a new goal
 *     description: Create a new goal in the system. This route requires a valid JWT token for authentication.
 *     tags: [Goals]
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
 *               description:
 *                 type: string
 *               targetDate:  # Updated property name for consistency
 *                 type: string
 *     responses:
 *       200:
 *         description: Goal created successfully
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
 *                 targetDate:  # Updated property name for consistency
 *                   type: string
 *       500:
 *         description: Failed to create goal
 */
router.post('/create', goalsController.createGoal);

/**
 * @swagger
 * /api/goals:
 *   get:
 *     summary: Get all goals
 *     description: Retrieve a list of all goals in the system. This route requires a valid JWT token for authentication.
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of goals
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
 *                   description:
 *                     type: string
 *                   targetDate:  # Updated property name for consistency
 *                     type: string
 *       500:
 *         description: Failed to fetch goals
 */
router.get('/', goalsController.getAllGoals);

/**
 * @swagger
 * /api/goals/{id}:
 *   get:
 *     summary: Get a goal by ID
 *     description: Retrieve a specific goal by its ID. This route requires a valid JWT token for authentication.
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the goal
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Goal retrieved successfully
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
 *                 targetDate:  # Updated property name for consistency
 *                   type: string
 *       404:
 *         description: Goal not found
 *       500:
 *         description: Failed to fetch goal
 */
router.get('/:id', goalsController.getGoalById);

/**
 * @swagger
 * /api/goals/{id}:
 *   put:
 *     summary: Update an existing goal
 *     description: Update the details of an existing goal by its ID. This route requires a valid JWT token for authentication.
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the goal to be updated
 *         required: true
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
 *               targetDate:  # Updated property name for consistency
 *                 type: string
 *     responses:
 *       200:
 *         description: Goal updated successfully
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
 *                 targetDate:  # Updated property name for consistency
 *                   type: string
 *       404:
 *         description: Goal not found
 *       500:
 *         description: Failed to update goal
 */
router.put('/:id', goalsController.updateGoal);

/**
 * @swagger
 * /api/goals/{id}:
 *   delete:
 *     summary: Delete a goal
 *     description: Delete a goal by its ID. This route requires a valid JWT token for authentication.
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the goal to be deleted
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Goal deleted successfully
 *       404:
 *         description: Goal not found
 *       500:
 *         description: Failed to delete goal
 */
router.delete('/:id', goalsController.deleteGoal);

export { router as goalsRoutes };
