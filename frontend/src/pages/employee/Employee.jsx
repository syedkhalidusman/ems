import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch employees from the API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        setEmployees(response.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError('Failed to load employees.');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Navigate to the edit page for a particular employee
  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  return (
    <div className="p-6 pt-0 h-[90vh] w-full flex overflow-y-auto flex-col bg-transparent">
      {/* Title */}
      <h2 className="text-2xl font-bold text-center py-4 text-white">Employee List</h2>

      {/* Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500">Loading employees...</p>
        </div>
      ) : (
        <div className="flex-grow">
          <div className="flex flex-wrap gap-6 justify-center">
            {employees.map((emp) => (
              <div
                key={emp._id}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-300 w-full sm:w-[80%] md:w-[36%] lg:w-[28%] xl:w-[23%] min-h-[350px]"
              >
                <h3 className="text-lg font-semibold text-center mb-2">{emp.name}</h3>
                <p className="text-gray-600 mb-1">
                  <strong>Email:</strong> <span className="break-words">{emp.email}</span>
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Address:</strong> {emp.address}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Phone:</strong> {emp.phone}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Position:</strong> {emp.position}
                </p>
                <p className="text-gray-600 mb-3">
                  <strong>Department:</strong> {emp.department}
                </p>

                {/* Edit Button */}
                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() => handleEdit(emp._id)}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {employees.length === 0 && (
            <p className="text-center text-gray-500 mt-6">No employees found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Employee;
