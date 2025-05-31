import React, {useEffect, useState} from "react";
import GoalDetail from "./GoalDetail";
import axios from "axios";

const apiUrl = process.env.API_URL || 'http://localhost:3001'

export default function Dashboard() {
    const [goals, setGoals] = useState([]);
    const [creating, setCreating] = useState(false);
    const [newGoal, setNewGoal] = useState({ title: '', deadline: '' });

    useEffect(() => {
        const fetchGoals = async () => {
            const res = await axios.get(`${apiUrl}/api/goals`);
            setGoals(res.data);
        };
        fetchGoals();
    }, []);
    const handleCreateGoal = async () => {
        if (!newGoal.title || !newGoal.deadline) return;
        const res = await axios.post(`${apiUrl}/api/goals`, newGoal);
        setGoals([...goals, res.data]);
        setNewGoal({ title: '', deadline: '' });
        setCreating(false);
    };
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Goals</h1>

            <div className="flex items-center mb-4 space-x-2">
                <button
                    onClick={() => setCreating(!creating)}
                    className="bg-blue-500 text-white rounded-full w-8 h-8 hover:bg-blue-600 flex items-center justify-center"
                    title="Create New Goal"
                >
                    +
                </button>
                {creating && (
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="Goal Title"
                            value={newGoal.title}
                            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                            className="border px-2 py-1"
                        />
                        <input
                            type="date"
                            value={newGoal.deadline}
                            onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                            className="border px-2 py-1"
                        />
                        <button
                            onClick={handleCreateGoal}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                            disabled={!newGoal.title || !newGoal.deadline}
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>


            {goals.map((goal) => (
                <GoalDetail key={goal.id} embeddedId={goal.id} />
            ))}
        </div>
    );
}