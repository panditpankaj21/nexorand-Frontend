// src/components/UserList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pointsHistory, setPointsHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch users from the API
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URI}/api/user/v1/get-users`);
            const sortedUsers = response.data.data.sort((a, b) => b.points - a.points);
            setUsers(sortedUsers);
        } catch (err) {
            setError('Error fetching users');
        } finally {
            setLoading(false);
        }
    };

    // Fetch user points history
    const fetchUserHistory = async (username) => {
        try {
            const response = await axios.post('https://leaderboard-fdyt.onrender.com/api/user/v1/your-history', { username });
            setPointsHistory(response.data.data);
        } catch (err) {
            setError('Error fetching user history');
        }
    };

    // Handle user click to open modal
    const handleUserClick = (user) => {
        setSelectedUser(user);
        fetchUserHistory(user.username);
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
        setPointsHistory([]);
    };

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6 max-w-7xl mx-auto bg-white border border-gray-300 shadow rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-5 text-center">Leaderboard</h1>
            <ul className="space-y-3">
                {users.map((user) => (
                    <li
                        key={user._id}
                        className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleUserClick(user)}
                    >
                        <span className="text-gray-700 font-medium">{user.username}</span>
                        <span className="text-gray-600 font-semibold">{user.Points} pts</span>
                    </li>
                ))}
            </ul>
            {isModalOpen && (
                <Modal user={selectedUser} pointsHistory={pointsHistory} onClose={closeModal} />
            )}
        </div>
    );
};

export default UserList;
