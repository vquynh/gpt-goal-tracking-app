import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import React from "react";

export default function GoalDetail({ embeddedId }: { embeddedId?: string }) {
    const routeParams = useParams();
    const id = embeddedId || routeParams.id;
    const [goal, setGoal] = useState(null);
    const [actions, setActions] = useState([]);
    const [editingCell, setEditingCell] = useState<{ index: number; field: string } | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGoal = async () => {
            const res = await axios.get(`http://localhost:3001/api/goals/${id}`);
            setGoal(res.data);
        };
        const fetchActions = async () => {
            const res = await axios.get(`http://localhost:3001/api/goals/${id}/actions`);
            setActions(Array.isArray(res.data) ? res.data : res.data.actions || []);
        };
        if (id) {
            fetchGoal();
            fetchActions();
        }
    }, [id]);

    const handleUpdate = async (index: number, field: string, value: string) => {
        const updated = [...actions];
        updated[index][field] = value;
        setActions(updated);

        const action = updated[index];
        const requiredFields = ['title', 'start_date', 'end_date', 'interval', 'status'];
        const hasEmpty = requiredFields.some((f) => !action[f]);
        if (hasEmpty) {
            setError('All fields are required.');
            return;
        }
        setError('');

        if (action.id) {
            await axios.put(`/api/actions/${action.id}`, action);
        } else {
            const res = await axios.post(`/api/goals/${id}/actions`, action);
            updated[index] = res.data;
            setActions(updated);
        }
    };

    const handleAddAction = () => {
        setActions([
            ...actions,
            {
                id: undefined,
                title: '',
                start_date: '',
                end_date: '',
                interval: '',
                status: 'pending',
            },
        ]);
    };

    if (!goal) return <p>Loading...</p>;

    return (
        <div className="space-y-4 mt-4 border-t pt-4">
            <h2 className="text-xl font-bold">{goal.title}</h2>
            <p>Deadline: {goal.deadline}</p>

            <h3 className="text-lg font-semibold mt-6">Actions</h3>
            {error && <p className="text-red-500">{error}</p>}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 text-left">Title</th>
                        <th className="border p-2 text-left">Start Date</th>
                        <th className="border p-2 text-left">End Date</th>
                        <th className="border p-2 text-left">Interval</th>
                        <th className="border p-2 text-left">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {actions.map((action, index) => (
                        <tr key={index} className="odd:bg-white even:bg-gray-50">
                            {['title', 'start_date', 'end_date', 'interval'].map((field) => (
                                <td
                                    key={field}
                                    className="border p-2 cursor-pointer"
                                    onClick={() => setEditingCell({ index, field })}
                                >
                                    {editingCell?.index === index && editingCell?.field === field ? (
                                        <input
                                            type={field.includes('date') ? 'date' : 'text'}
                                            className="w-full border p-1"
                                            value={action[field]}
                                            onChange={(e) => handleUpdate(index, field, e.target.value)}
                                            onBlur={() => setEditingCell(null)}
                                            autoFocus
                                        />
                                    ) : (
                                        <span>{action[field]}</span>
                                    )}
                                </td>
                            ))}
                            <td
                                className="border p-2 cursor-pointer"
                                onClick={() => setEditingCell({ index, field: 'status' })}
                            >
                                {editingCell?.index === index && editingCell?.field === 'status' ? (
                                    <select
                                        className="w-full border p-1"
                                        value={action.status}
                                        onChange={(e) => handleUpdate(index, 'status', e.target.value)}
                                        onBlur={() => setEditingCell(null)}
                                        autoFocus
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="done">Done</option>
                                    </select>
                                ) : (
                                    <span>{action.status}</span>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-2">
                <button
                    onClick={handleAddAction}
                    className="inline-flex items-center justify-center bg-green-500 text-white rounded-full w-10 h-10 hover:bg-green-600"
                    title="Add Action"
                >
                    +
                </button>
            </div>
        </div>
    );
}