import { useQuery } from '@tanstack/react-query';
import { fetchGoals } from '../api/goals';
import { Link } from 'react-router-dom';
import React from "react";

export default function Dashboard() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['goals'],
        queryFn: fetchGoals
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading goals.</p>;

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Goals</h1>
            <ul>
                {data.map((goal: any) => (
                    <li key={goal.id}>
                        <Link to={`/goal/${goal.id}`} className="text-blue-600 hover:underline">
                            {goal.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}