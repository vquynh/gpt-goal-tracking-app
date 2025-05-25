import { getGoals, getGoalById, createGoal, updateGoal, deleteGoal } from '../src/controllers/goals';
import { Request } from 'express';
import { mockResponse } from './testUtils';
import * as db from '../src/db';

jest.mock('../src/db');

describe('Goals Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('getGoals should return all goals', async () => {
        const mockGoals = [{ id: 1, title: 'Test Goal' }];
        (db.default.query as jest.Mock).mockResolvedValue({ rows: mockGoals });

        const req = {} as Request;
        const res = mockResponse();

        await getGoals(req, res);

        expect(res.json).toHaveBeenCalledWith(mockGoals);
    });

    it('getGoalById should return the correct goal', async () => {
        const mockGoals = [{ id: 1, title: 'Test Goal' }];
        (db.default.query as jest.Mock).mockResolvedValue({ rows: mockGoals });

        const req = {
            params: { id: '1' }
        } as unknown as Request;
        const res = mockResponse();

        await getGoalById(req, res);

        expect(res.json).toHaveBeenCalledWith(mockGoals[0]);
    });

    it('createGoal should create a new goal', async () => {
        const mockInsert = { rows: [{ id: 1, title: 'New Goal' }] };
        (db.default.query as jest.Mock).mockResolvedValue(mockInsert);

        const req = {
            body: {
                title: 'New Goal',
                description: 'Goal Description',
                startDate: '2025-01-01',
                endDate: '2025-02-01',
                status: 'active'
            }
        } as Request;
        const res = mockResponse();

        await createGoal(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockInsert.rows[0]);
    });

    it('updateGoal should update a goal', async () => {
        const mockUpdate = { rows: [{ id: 1, title: 'Updated Goal' }] };
        (db.default.query as jest.Mock).mockResolvedValue(mockUpdate);

        const req = {
            params: { id: '1' },
            body: {
                title: 'Updated Goal',
                description: 'Updated description',
                startDate: '2025-01-01',
                endDate: '2025-02-01',
                status: 'completed'
            }
        } as unknown as Request;
        const res = mockResponse();

        await updateGoal(req, res);

        expect(res.json).toHaveBeenCalledWith(mockUpdate.rows[0]);
    });

    it('deleteGoal should delete a goal', async () => {
        (db.default.query as jest.Mock).mockResolvedValue({ rows: [{}] });

        const req = { params: { id: '1' } } as unknown as Request;
        const res = mockResponse();

        await deleteGoal(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
    });
});
