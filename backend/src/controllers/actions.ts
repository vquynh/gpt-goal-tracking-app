import { Request, Response } from 'express';
import pool from '../db';

export const getActionById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM goal_tracker.actions WHERE id = $1 LIMIT 1', [id]);
    res.json(result.rows[0]);
};

export const getActionsByGoalId = async (req: Request, res: Response) => {
    const { goalId } = req.params;
    const result = await pool.query('SELECT * FROM goal_tracker.actions WHERE goal_id = $1', [goalId]);
    res.json(result.rows);
};

export const createAction = async (req: Request, res: Response) => {
    const { goalId } = req.params;
    console.log(`goalId: ${goalId}`);
    const { title, start_date, end_date, interval, status } = req.body;
    const result = await pool.query(
        'INSERT INTO goal_tracker.actions (goal_id, title, start_date, end_date, interval, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [goalId, title, start_date, end_date, interval, status]
    );
    res.status(201).json(result.rows[0]);
};

export const updateAction = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, start_date, end_date, interval, status } = req.body;
    const result = await pool.query(
        'UPDATE goal_tracker.actions SET title = $1, start_date = $2, end_date = $3, interval = $4, status = $5 WHERE id = $6 RETURNING *',
        [title, start_date, end_date, interval, status, id]
    );
    res.json(result.rows[0]);
};

export const deleteAction = async (req: Request, res: Response) => {
    const { id } = req.params;
    await pool.query('DELETE FROM goal_tracker.actions WHERE id = $1', [id]);
    res.status(204).send();
};
