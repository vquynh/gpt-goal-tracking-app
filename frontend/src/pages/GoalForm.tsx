import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as React from "react";
import {useState} from "react";

export default function GoalForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('active');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post('http://localhost:3001/api/goals', {
            title,
            description,
            start_date: startDate,
            end_date: endDate,
            status,
        });
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                className="border p-2 w-full"
                placeholder="Title"
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
            <select
                className="border p-2 w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
            </select>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Create Goal</button>
        </form>
    );
}