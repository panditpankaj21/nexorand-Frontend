import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URI}/api/user/v1/get-users`);
        setFriends(response.data.data.sort((a, b) => b.Points - a.Points))
      } catch (error) {
        console.error('Error fetching friends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  const handleClaimPoints = async (friendUsername) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_REACT_APP_API_URI}/api/user/v1/claim-points`, {
        username: friendUsername,
      });
  
      const updatedPointFriends = friends
        .map((friend) =>
          friend.username === friendUsername
            ? { ...friend, Points: response.data.data.Points }
            : friend
        );

      updatedPointFriends.sort((a, b) => b.Points - a.Points);
  
      setFriends(updatedPointFriends);
  
    } catch (error) {
      console.error('Error updating points:', error);
    }
  };
  
  
  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="p-4 text-left">Rank</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Points</th>
          </tr>
        </thead>
        <tbody>
          {friends.map((friend, index) => (
            <tr
              key={friend._id}
              onClick={() => handleClaimPoints(friend.username)}
              className="cursor-pointer transition hover:bg-blue-100 border-b last:border-none"
            >
              <td className="p-4 text-gray-700 font-medium">{index + 1}</td>
              <td className="p-4 text-gray-800 font-semibold">{friend.username}</td>
              <td className="p-4 text-gray-700">{friend.Points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-sm text-gray-500">Click on a name to increase points and update rankings</p>
    </div>
  );
};

export default HomePage;
