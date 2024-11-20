import React from 'react';
import { FaUsers, FaUserPlus, FaSignInAlt, FaUserLock, FaTachometerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`bg-gray-800 text-white transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-[20%] h-screen fixed`}
    >
      <div className="h-full p-4 overflow-y-auto">
        <ul className="space-y-4 font-medium">
          <li>
            <Link to="/dashboard" className="flex items-center p-2 rounded-lg hover:bg-gray-700" aria-label="Dashboard">
              <FaTachometerAlt className="w-6 h-6" title="Dashboard Icon" />
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/employee" className="flex items-center p-2 rounded-lg hover:bg-gray-700" aria-label="Employee">
              <FaUsers className="w-6 h-6" title="Employee Icon" />
              <span className="ml-3">Employee</span>
            </Link>
          </li>
          <li>
            <Link to="/add-employee" className="flex items-center p-2 rounded-lg hover:bg-gray-700" aria-label="Add Employee">
              <FaUserPlus className="w-6 h-6" title="Add Employee Icon" />
              <span className="ml-3">Add Employee</span>
            </Link>
          </li>
          <li>
            <Link to="/signin" className="flex items-center p-2 rounded-lg hover:bg-gray-700" aria-label="Sign In">
              <FaSignInAlt className="w-6 h-6" title="Sign In Icon" />
              <span className="ml-3">Sign In</span>
            </Link>
          </li>
          <li>
            <Link to="/signup" className="flex items-center p-2 rounded-lg hover:bg-gray-700" aria-label="Sign Up">
              <FaUserLock className="w-6 h-6" title="Sign Up Icon" />
              <span className="ml-3">Sign Up</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
