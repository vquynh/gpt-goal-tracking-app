import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import GoalForm from './pages/GoalForm';
import ActionForm from './pages/ActionForm';
import React from "react";

function App() {
    return (
        <div className="p-4">
            <nav className="mb-4">
                <Link to="/" className="text-blue-500 underline">Dashboard</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/goal/new" element={<GoalForm />} />
                <Route path="/goal/:goalId/action/new" element={<ActionForm />} />
            </Routes>
        </div>
    );
}

export default App;