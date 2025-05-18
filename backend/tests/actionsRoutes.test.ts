import request from 'supertest';
import express from 'express';
import actionsRouter from '../src/routes/actions';
import * as db from "../src/db";

const app = express();
app.use(express.json());
app.use('/api/actions', actionsRouter);

jest.mock('../src/db');

const mockQuery = db.default.query as jest.Mock;

describe('Actions Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Actions API', () => {
        it('should respond with 200 on GET /api/actions/:id', async () => {
            const mockAction = { id: 1, title: 'Mock Action' };
            mockQuery.mockResolvedValue({ rows:  [mockAction]});
            const res = await request(app).get('/api/actions/1');
            expect(200).toBe(res.status);
            expect(mockAction).toStrictEqual(res.body);
        });

        it('should respond with appropriate status on PUT /api/actions/:id', async () => {
            const mockUpdateAction = { id: 1, title: 'Updated Action' };
            (db.default.query as jest.Mock).mockResolvedValue({ rows: [mockUpdateAction] });

            const res = await request(app)
                .put('/api/actions/1')
                .send({
                    title: 'Updated Action',
                    start_date: '2025-01-01',
                    end_date: '2025-01-15',
                    interval: 'weekly',
                    status: 'completed',
                });
            expect(200).toBe(res.status);
            expect(mockUpdateAction).toStrictEqual(res.body);
        });

        it('should respond with 204 or 404 on DELETE /api/actions/:id', async () => {
            (db.default.query as jest.Mock).mockResolvedValue({});
            const res = await request(app).delete('/api/actions/1');
            expect(204).toBe(res.status);
        });
    });
});
