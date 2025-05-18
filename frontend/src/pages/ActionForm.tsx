import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ActionForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const navigate = useNavigate();
    const { goalId } = useParams();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post(`http://localhost:3001/api/goals/${goalId}/actions`, {
            title,
            description,
            status,
        });
        navigate(`/goal/${goalId}`);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                className="border p-2 w-full"
                placeholder="Action Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                className="border p-2 w-full"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <select
                className="border p-2 w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="pending">Pending</option>
                <option value="done">Done</option>
            </select>
            <button className="bg-green-500 text-white px-4 py-2 rounded">Create Action</button>
        </form>
    );
}