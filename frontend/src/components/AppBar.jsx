import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function AppBar({ currentUser }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleUserClick = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleLogout = () => {
    navigate('/signin');
  };

  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">
        Payments App
      </div>
      <div className="relative flex">
        <div className="flex flex-col justify-center h-full mr-4">Hello, {currentUser?.firstName}!</div>
        <div
          className="rounded-full h-12 w-12 flex justify-center mt-1 mr-2 cursor-pointer text-white bg-gray-800 hover:bg-gray-900"
          onClick={handleUserClick}
        >
          <div className="flex flex-col justify-center h-full text-xl">
            {currentUser?.userName?.charAt(0)?.toUpperCase() ?? "User"}
          </div>
        </div>
        {dropdownOpen && (
          <div className="absolute top-1 right-2 mt-12 w-48 border bg-white shadow-lg rounded-lg py-2">
            <div
              className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
