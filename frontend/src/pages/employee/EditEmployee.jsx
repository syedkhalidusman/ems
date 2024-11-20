import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline'; // Correct import path for Heroicons v2

const EditEmployee = () => {
  const { id } = useParams(); // Get employee ID from URL params
  const navigate = useNavigate();
  
  // State to store employee data
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    position: '',
    department: '',
  });

  // Fetch employee details by ID
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };
    fetchEmployee();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // Handle form submission to update employee data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/employees/${id}`, employee);
      navigate('/employee'); // Redirect to employee list page after update
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    navigate('/employee'); // Redirect to employee list without saving changes
  };

  // Handle delete button click
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      navigate('/employee'); // Redirect to employee list after deletion
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="h-full w-full mx-10 flex items-center justify-center p-6 ">
      <div className="max-w-4xl w-full sm:max-w-5xl md:max-w-6xl lg:max-w-7xl xl:max-w-8xl bg-white shadow-2xl rounded-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:space-x-4 gap-4">
            <div className="flex-1">
              <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                value={employee.name}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
            </div>

            <div className="flex-1">
              <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={employee.email}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 gap-4">
            <div className="flex-1">
              <label htmlFor="address" className="block text-gray-700 font-medium">Address</label>
              <input
                id="address"
                type="text"
                name="address"
                placeholder="Address"
                value={employee.address}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="phone" className="block text-gray-700 font-medium">Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={employee.phone}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 gap-4">
            <div className="flex-1">
              <label htmlFor="position" className="block text-gray-700 font-medium">Position</label>
              <input
                id="position"
                type="text"
                name="position"
                placeholder="Position"
                value={employee.position}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="department" className="block text-gray-700 font-medium">Department</label>
              <input
                id="department"
                type="text"
                name="department"
                placeholder="Department"
                value={employee.department}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full sm:w-auto hover:bg-blue-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-600 text-white py-2 px-4 rounded-lg w-full sm:w-auto hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Delete button with icon */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 w-full flex items-center justify-center gap-2 sm:w-auto"
          >
            <TrashIcon className="h-5 w-5" /> {/* Icon next to the button text */}
            Delete Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
