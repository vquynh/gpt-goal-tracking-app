import { Link } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import GoalDetail from "./GoalDetail";
import axios from "axios";

export default function Dashboard() {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const fetchGoals = async () => {
            const res = await axios.get('http://localhost:3001/api/goals');
            setGoals(res.data);
        };
        fetchGoals();
    }, []);

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Goals Dashboard</h1>

            <Link to="/goal/new" className="bg-blue-500 text-white px-4 py-2 rounded">
                Create New Goal
            </Link>

            {goals.map((goal) => (
                <GoalDetail key={goal.id} embeddedId={goal.id} />
            ))}
        </div>
    );
}