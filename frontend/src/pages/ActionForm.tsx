import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ActionForm() {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [interval, setInterval] = useState('');
    const [status, setStatus] = useState('pending');
    const navigate = useNavigate();
    const { goalId } = useParams();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post(`http://localhost:3001/api/goals/${goalId}/actions`, {
            title,
            start_date: startDate,
            end_date: endDate,
            interval,
            status,
        });
        navigate(`/`);
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
            <input
                className="border p-2 w-full"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
            />
            <input
                className="border p-2 w-full"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
            />
            <input
                className="border p-2 w-full"
                placeholder="Interval"
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
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