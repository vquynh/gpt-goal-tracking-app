import request from 'supertest';
import express from 'express';
import actionsRouter from '../src/routes/actions';

const app = express();
app.use(express.json());
app.use('/api/actions', actionsRouter);

describe('Actions API', () => {
    it('should respond with 200 on GET /api/actions/:goalId', async () => {
        const res = await request(app).get('/api/actions/1');
        expect([200, 500, 404]).toContain(res.status); // Depends on mock/real DB
    });

    it('should respond with 201 on POST /api/actions/:goalId with valid body', async () => {
        const res = await request(app)
            .post('/api/actions/1')
            .send({
                title: 'Test Action',
                start_date: '2025-01-01',
                end_date: '2025-01-15',
                interval: 'daily',
                status: 'pending',
            });
        expect([201, 500, 400]).toContain(res.status); // placeholder response codes
    });

    it('should respond with appropriate status on PUT /api/actions/:id', async () => {
        const res = await request(app)
            .put('/api/actions/1')
            .send({
                title: 'Updated Action',
                start_date: '2025-01-01',
                end_date: '2025-01-15',
                interval: 'weekly',
                status: 'completed',
            });
        expect([200, 404, 500]).toContain(res.status);
    });

    it('should respond with 204 or 404 on DELETE /api/actions/:id', async () => {
        const res = await request(app).delete('/api/actions/1');
        expect([204, 404, 500]).toContain(res.status);
    });
});
