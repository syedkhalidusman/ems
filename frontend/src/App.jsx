import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Welcome from './components/Welcome';
import Dashboard from './pages/Dashboard';
import EditEmployee from './pages/employee/EditEmployee';
import AddEmployee from './pages/employee/AddEmployee';
import Employee from './pages/employee/Employee';
import EmployeeDetails from './pages/employee/EmployeeDetails';
import ProtectedRoute from './components/ProtectedRoute'; // The new protected route component

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Routes>
      {/* Authentication Routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Main Layout with Nested Routes */}
      <Route
        path="/"
        element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />}
      >
        <Route index element={<Welcome />} />
        <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="employee" element={<Employee />} />
        <Route path="employee/:id" element={<EmployeeDetails />} />
        <Route path="add-employee" element={<AddEmployee />} />
        <Route path="edit-employee/:id" element={<EditEmployee />} />
      </Route>

      {/* Fallback Route for Undefined Paths */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
};

export default App;
