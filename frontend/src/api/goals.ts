import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const fetchGoals = async () => {
    const res = await axios.get(`${apiUrl}/api/goals`);
    return res.data;
};

export const fetchGoal = async (id: string) => {
    const res = await axios.get(`${apiUrl}/api/goals/${id}`);
    return res.data;
};