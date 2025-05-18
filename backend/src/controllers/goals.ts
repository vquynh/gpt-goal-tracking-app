import { Request, Response } from 'express';
import pool from '../db';

export const getGoals = async (_req: Request, res: Response) => {
    const result = await pool.query('SELECT * FROM goal_tracker.goals');
    res.json(result.rows);
};

export const getGoalById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM goal_tracker.goals WHERE id = $1 LIMIT 1', [id]);
    res.json(result.rows[0]);
};

export const createGoal = async (req: Request, res: Response) => {
    const { title, deadline } = req.body;
    const result = await pool.query(
        'INSERT INTO goal_tracker.goals (title, deadline) VALUES ($1, $2) RETURNING *',
        [title, deadline]
    );
    res.status(201).json(result.rows[0]);
};

export const updateGoal = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, deadline } = req.body;
    const result = await pool.query(
        'UPDATE goal_tracker.goals SET title = $1, deadline = $2 WHERE id = $3 RETURNING *',
        [title, deadline, id]
    );
    res.json(result.rows[0]);
};

export const deleteGoal = async (req: Request, res: Response) => {
    const { id } = req.params;
    await pool.query('DELETE FROM goal_tracker.goals WHERE id = $1', [id]);
    res.status(204).send();
};
