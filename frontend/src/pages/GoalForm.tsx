import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as React from "react";
import {useState} from "react";

const apiUrl = process.env.VITE_API_URL || 'http://localhost:3001'

export default function GoalForm() {
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post(`${apiUrl}/api/goals`, {
            title,
            deadline,
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
            <input
                className="border p-2 w-full"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Create Goal</button>
        </form>
    );
}