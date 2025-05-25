import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import React from "react";

export default function GoalDetail({ embeddedId }: { embeddedId?: string }) {
    const routeParams = useParams();
    const id = embeddedId || routeParams.id;
    const [goal, setGoal] = useState(null);
    const [actions, setActions] = useState([]);

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
        await axios.put(`/api/actions/${updated[index].id}`, updated[index]);
    };

    if (!goal) return <p>Loading...</p>;

    return (
        <div className="space-y-4 mt-4 border-t pt-4">
            <h2 className="text-xl font-bold">{goal.title}</h2>
            <p>Deadline: {goal.deadline}</p>

            <h3 className="text-lg font-semibold mt-6">Actions</h3>
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
                        <tr key={action.id} className="odd:bg-white even:bg-gray-50">
                            <td className="border p-2">
                                <input
                                    className="w-full border p-1"
                                    value={action.title}
                                    onChange={(e) => handleUpdate(index, 'title', e.target.value)}
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="date"
                                    className="w-full border p-1"
                                    value={action.start_date}
                                    onChange={(e) => handleUpdate(index, 'start_date', e.target.value)}
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="date"
                                    className="w-full border p-1"
                                    value={action.end_date}
                                    onChange={(e) => handleUpdate(index, 'end_date', e.target.value)}
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    className="w-full border p-1"
                                    value={action.interval}
                                    onChange={(e) => handleUpdate(index, 'interval', e.target.value)}
                                />
                            </td>
                            <td className="border p-2">
                                <select
                                    className="w-full border p-1"
                                    value={action.status}
                                    onChange={(e) => handleUpdate(index, 'status', e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="done">Done</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-2">
                <a
                    href={`/goal/${id}/action/new`}
                    className="inline-flex items-center justify-center bg-green-500 text-white rounded-full w-10 h-10 hover:bg-green-600"
                    title="Add Action"
                >
                    +
                </a>
            </div>
        </div>
    );
}