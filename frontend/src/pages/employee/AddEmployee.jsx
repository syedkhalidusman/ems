import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const newEmployee = { name, email, address, phone, position, department };

    try {
      // Send the data to the backend
      const response = await axios.post(
        "http://localhost:5000/api/employees",
        newEmployee
      );
      console.log("Employee added:", response.data); // Log the response from the backend
      navigate("/employees"); // Redirect to Employee list page
    } catch (error) {
      // Log the full error to the console for debugging
      console.error("Error response:", error.response);

      // Check if it's a duplicate email error or any other error from the backend
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message); // Set the error message from backend
      } else {
        setError("Error adding employee. Please try again.");
      }
    }
  };

  return (

      <div className="max-w-lg mx-auto p-6 mt-5 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add New Employee
        </h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}{" "}
        {/* Display error message */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700"
          >
            Add Employee
          </button>
        </form>
      </div>
   
  );
};

export default AddEmployee;
