import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const fetchGoals = async () => {
    const res = await axios.get(`${API_URL}/goals`);
    return res.data;
};

export const fetchGoal = async (id: string) => {
    const res = await axios.get(`${API_URL}/goals/${id}`);
    return res.data;
};