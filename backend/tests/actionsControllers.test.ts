import {getActionById, createAction, updateAction, deleteAction, getActionsByGoalId} from '../src/controllers/actions';
import { Request } from 'express';
import { mockResponse } from "./testUtils";
import * as db from '../src/db';

jest.mock('../src/db');

describe('Actions Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('getActionsByGoalId should return the actions of the given goal', async () => {
        const mockActions = [{ id: 1, title: 'Mock Action' }];
        (db.default.query as jest.Mock).mockResolvedValue({ rows: mockActions });

        const req = { params: { id: '1' } } as unknown as Request;
        const res = mockResponse();

        await getActionsByGoalId(req, res);

        expect(res.json).toHaveBeenCalledWith(mockActions);
    });

    it('getActionById should return the action with the specific id', async () => {
        const mockActions = [{ id: 1, title: 'Mock Action' }];
        (db.default.query as jest.Mock).mockResolvedValue({ rows: mockActions });

        const req = { params: { id: '1' } } as unknown as Request;
        const res = mockResponse();

        await getActionById(req, res);

        expect(res.json).toHaveBeenCalledWith(mockActions[0]);
    });

    it('createAction should create a new action', async () => {
        const mockInsert = { rows: [{ id: 1, title: 'New Action' }] };
        (db.default.query as jest.Mock).mockResolvedValue(mockInsert);

        const req = {
            params: { goalId: '1' },
            body: {
                title: 'New Action',
                start_date: '2025-01-01',
                end_date: '2025-01-15',
                interval: 'daily',
                status: 'pending'
            }
        } as unknown as Request;
        const res = mockResponse();

        await createAction(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockInsert.rows[0]);
    });

    it('updateAction should update an existing action', async () => {
        const mockUpdate = { rows: [{ id: 1, title: 'Updated Action' }] };
        (db.default.query as jest.Mock).mockResolvedValue(mockUpdate);

        const req = {
            params: { id: '1' },
            body: {
                title: 'Updated Action',
                start_date: '2025-01-01',
                end_date: '2025-01-15',
                interval: 'weekly',
                status: 'completed'
            }
        } as unknown as Request;
        const res = mockResponse();

        await updateAction(req, res);

        expect(res.json).toHaveBeenCalledWith(mockUpdate.rows[0]);
    });

    it('deleteAction should delete an action', async () => {
        (db.default.query as jest.Mock).mockResolvedValue({});

        const req = { params: { id: '1' } } as unknown as Request;
        const res = mockResponse();

        await deleteAction(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
    });
});
