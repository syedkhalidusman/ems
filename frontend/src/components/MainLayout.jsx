import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-grow transition-all mt-[10vh] duration-300">
        <div
          className={`flex flex-grow transition-all duration-300 h-[100%] ${
            isSidebarOpen ? "w-[20vw]" : "w-[0vw]"
          }`}
        >
          <Sidebar isOpen={isSidebarOpen} />
        </div>
        <main
          className={`flex flex-grow transition-all duration-300 ${
            isSidebarOpen ? "w-[80vw]" : "w-[100vw]"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
