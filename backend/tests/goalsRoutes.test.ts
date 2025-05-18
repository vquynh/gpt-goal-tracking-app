import request from 'supertest';
import * as db from '../src/db';
import express from "express";
import goalsRoutes from "../src/routes/goals";

const app = express();
app.use(express.json());
app.use('/api/goals', goalsRoutes);

jest.mock('../src/db');

const mockQuery = db.default.query as jest.Mock;

describe('Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Goals Routes', () => {
        it('GET /api/goals should return goals', async () => {
            mockQuery.mockResolvedValue({ rows: [{ id: 1, title: 'Goal 1' }] });
            const res = await request(app).get('/api/goals');
            expect(res.status).toBe(200);
            expect(res.body).toEqual([{ id: 1, title: 'Goal 1' }]);
        });

        it('POST /api/goals should create a goal', async () => {
            mockQuery.mockResolvedValue({ rows: [{ id: 1, title: 'New Goal' }] });
            const res = await request(app)
                .post('/api/goals')
                .send({
                    title: 'New Goal',
                    description: 'Test',
                    start_date: '2025-01-01',
                    end_date: '2025-02-01',
                    status: 'active'
                });
            expect(res.status).toBe(201);
            expect(res.body).toEqual({ id: 1, title: 'New Goal' });
        });

        it('PUT /api/goals/:id should update a goal', async () => {
            mockQuery.mockResolvedValue({ rows: [{ id: 1, title: 'Updated Goal' }] });
            const res = await request(app)
                .put('/api/goals/1')
                .send({
                    title: 'Updated Goal',
                    description: 'Updated Description',
                    start_date: '2025-01-01',
                    end_date: '2025-02-01',
                    status: 'completed'
                });
            expect(res.status).toBe(200);
            expect(res.body).toEqual({ id: 1, title: 'Updated Goal' });
        });

        it('DELETE /api/goals/:id should delete a goal', async () => {
            mockQuery.mockResolvedValue({ rows: [{}] });
            const res = await request(app).delete('/api/goals/1');
            expect(res.status).toBe(204);
        });

        it('GET /api/goals/:id/actions should return actions', async () => {
            const mockActions = [{ id: 1, title: 'Action 1' }];
            mockQuery.mockResolvedValue({ rows:  mockActions});
            const res = await request(app).get('/api/goals/1/actions');
            expect(res.status).toBe(200);
            expect(res.body).toStrictEqual(mockActions);
        });

        it('POST /api/goals/:goalId/actions with valid body should create an action', async () => {
            const mockInsert = [{ id: 1, title: 'New Action' }] ;
            (db.default.query as jest.Mock).mockResolvedValue({ rows: mockInsert});
            const res = await request(app)
                .post('/api/goals/1/actions')
                .send({
                    title: 'Test Action',
                    start_date: '2025-01-01',
                    end_date: '2025-01-15',
                    interval: 'daily',
                    status: 'pending',
                });
            expect(201).toBe(res.status);
            expect(mockInsert[0]).toStrictEqual(res.body);
        });
    });
});
