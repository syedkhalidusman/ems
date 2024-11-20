import React, { useState, useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting
import axios from 'axios';

const Navbar = ({ toggleSidebar }) => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate(); // To redirect user after logout

  useEffect(() => {
    // Fetch user data from the backend (MongoDB)
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage (or sessionStorage)
      
      if (!token) {
        return; // If there's no token, the user is not logged in
      }

      try {
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}` // Send the token in the Authorization header
          }
        });

        setUsername(response.data.username); // Store the username
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUsername('Guest'); // Fallback if there's an error
      }
    };

    fetchUserData();
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setUsername(null); // Clear the username from state
    navigate('/signin'); // Redirect to login page (or home page)
  };

  return (
    <div className="navbar px-6 h-[10vh] bg-blue-600 fixed items-center justify-between shadow-md w-full">
      <button
        onClick={toggleSidebar}
        className="text-white text-2xl focus:outline-none"
      >
        <AiOutlineMenu />
      </button>

      <h1 className="text-white text-xl">
        {username ? `Hello, ${username}` : 'Hello, Guest'}
      </h1>

      {/* Logout Button */}
      <div className="flex items-center gap-4">
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>

        <Link to="/add-employee">
          <button className="bg-green-500 px-4 py-2 text-white rounded-md hover:bg-green-600">
            Add Employee
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
