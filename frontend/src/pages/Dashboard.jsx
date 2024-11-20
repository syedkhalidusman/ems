import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  // Fetching dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch total employees count
        const employeesResponse = await axios.get('http://localhost:5000/api/employees');
        setTotalEmployees(employeesResponse.data.length);

        // Fetch recent employees (e.g., last 5 added)
        const recentResponse = await axios.get('http://localhost:5000/api/employees?limit=5');
        setRecentEmployees(recentResponse.data);

        setLoading(false);
      } catch (error) {
        setError('Failed to load data, please try again later.');
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className=" h-full w-full bg-transparent p-5">
      <h2 className="text-2xl font-bold text-center p-4 text-gray-700">Dashboard</h2>

      {/* Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800">Total Employees</h3>
          <p className="text-4xl font-bold text-green-500">{totalEmployees}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800">Active Employees</h3>
          <p className="text-4xl font-bold text-blue-500">{totalEmployees}</p> {/* Adjust if you have active data */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800">Departments</h3>
          <p className="text-4xl font-bold text-purple-500">10</p> {/* Example static data */}
        </div>
      </div>

      {/* Recent Employees Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Employees</h3>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <ul className="space-y-4">
            {recentEmployees.map((emp) => (
              <li key={emp._id} className="flex justify-between items-center">
                <span className="text-gray-700">{emp.name}</span>
                <Link
                  to={`/employee/${emp._id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick Action Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6 flex justify-between">
        <Link to="/add-employee">
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 w-full sm:w-auto">
            Add New Employee
          </button>
        </Link>
        <Link to="/reports">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 w-full sm:w-auto">
            View Reports
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
