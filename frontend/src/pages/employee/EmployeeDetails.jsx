import React, { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const EmployeeDetails = () => {
  const { id } = useParams(); 
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
        setEmployee(response.data);
      } catch (err) {
        console.error('Error fetching employee details:', err);
        setError('Failed to fetch employee details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  // Loading state
  if (loading) return <div className="text-center text-xl text-gray-600">Loading...</div>;

  // Error state
  if (error) return <div className="text-center text-red-500 text-xl">{error}</div>;

  // Handle edit button click
  const handleEditClick = () => {
    navigate(`/edit-employee/${id}`);
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-transparent py-10 px-4 sm:px-8">
      {employee ? (
        <div className="max-w-3xl w-full bg-white shadow-xl rounded-lg p-8">
          <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6">{employee.name}</h3>

          <div className="space-y-4">
            <div className="flex gap-4">
              <p className="text-lg text-gray-600 font-medium"><strong>Email:</strong></p>
              <p className="text-gray-700">{employee.email}</p>
            </div>

            <div className="flex gap-4">
              <p className="text-lg text-gray-600 font-medium"><strong>Address:</strong></p>
              <p className="text-gray-700">{employee.address}</p>
            </div>

            <div className="flex gap-4">
              <p className="text-lg text-gray-600 font-medium"><strong>Phone:</strong></p>
              <p className="text-gray-700">{employee.phone}</p>
            </div>

            <div className="flex gap-4">
              <p className="text-lg text-gray-600 font-medium"><strong>Position:</strong></p>
              <p className="text-gray-700">{employee.position}</p>
            </div>

            <div className="flex gap-4">
              <p className="text-lg text-gray-600 font-medium"><strong>Department:</strong></p>
              <p className="text-gray-700">{employee.department}</p>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleEditClick}
              className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Edit Employee
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-700">No employee details available.</p>
      )}
    </div>
  );
};

export default EmployeeDetails;
