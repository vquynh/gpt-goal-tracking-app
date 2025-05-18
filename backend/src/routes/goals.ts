import express from 'express';
import {getGoals, createGoal, updateGoal, deleteGoal, getGoalById} from '../controllers/goals';
import {createAction, getActionsByGoalId} from "../controllers/actions";

const router = express.Router();

/**
 * @swagger
 * /api/goals:
 *   get:
 *     summary: Get all goals
 *     responses:
 *       200:
 *         description: A list of goals
 */
router.get('/', getGoals);

/**
 * @swagger
 * /api/goals/{id}:
 *   get:
 *     summary: Get a goal by ID
 *     parameters:
 *     -    in: path
 *          name: id
 *          required: true
 *          description: The ID of the goal to retrieve
 *          schema:
 *              type: integer
 *     responses:
 *       200:
 *         description: A goal with the given ID
 */
router.get('/:id', getGoalById);

/**
 * @swagger
 * /api/goals:
 *   post:
 *     summary: Create a new goal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Goal created
 */
router.post('/', createGoal);

/**
 * @swagger
 * /api/goals:
 *   post:
 *     summary: Create a new goal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Goal created
 */
router.put('/:id', updateGoal);

router.delete('/:id', deleteGoal);

/**
 * @swagger
 * /api/goals/{goalId}/actions:
 *   post:
 *     summary: Create a new action for a specific goal
 *     parameters:
 *       - in: path
 *         name: goalId
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
 *               title:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               interval:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Action created
 */
router.post('/:goalId/actions', createAction);

/**
 * @swagger
 * /api/goals/{goalId}/actions:
 *   get:
 *     summary: Get all actions for a specific goal
 *     parameters:
 *       - in: path
 *         name: goalId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of actions
 */
router.get('/:goalId/actions', getActionsByGoalId);

export default router;
