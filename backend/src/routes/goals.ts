import express from 'express';
import { getGoals, createGoal, updateGoal, deleteGoal } from '../controllers/goals';

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

router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

export default router;
