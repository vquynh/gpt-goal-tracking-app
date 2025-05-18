import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import React from "react";

export default function GoalDetail() {
    const { id } = useParams();
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
        fetchGoal();
        fetchActions();
    }, [id]);

    if (!goal) return <p>Loading...</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">{goal.title}</h2>
            <p>{goal.description}</p>
            <p>Status: {goal.status}</p>
            <p>Start: {goal.start_date}</p>
            <p>End: {goal.end_date}</p>

            <Link
                to={`/goal/${id}/action/new`}
                className="inline-block bg-green-500 text-white px-4 py-2 rounded"
            >
                Add Action
            </Link>

            <h3 className="text-lg font-semibold mt-6">Actions</h3>
            <ul className="list-disc pl-6">
                {actions.map((action) => (
                    <li key={action.id}>
                        <p className="font-medium">{action.title}</p>
                        <p>{action.description}</p>
                        <p>Status: {action.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
