import express from 'express';
import { getActionById, updateAction, deleteAction } from '../controllers/actions';

const router = express.Router();

/**
 * @swagger
 * /api/actions/{id}:
 *   get:
 *     summary: Get a specific action by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The action with the given ID
 */
router.get('/:id', getActionById);

/**
 * @swagger
 * /api/actions/{id}:
 *   put:
 *     summary: Update an action by ID
 *     parameters:
 *       - in: path
 *         name: id
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
 *       200:
 *         description: Action updated
 */
router.put('/:id', updateAction);

/**
 * @swagger
 * /api/actions/{id}:
 *   delete:
 *     summary: Delete an action by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Action deleted
 */
router.delete('/:id', deleteAction);

export default router;
