/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useNavigate } from 'react-router-dom';



export function Navbar() {
  const navigate = useNavigate(); 
  const { user, setUser } = useContext(UserContext);

  function handleLogout() {
    setUser(null);
    navigate('/login');
  }

  return (
    <div className="fixed top-0 left-0 w-full h-20 bg-gradient-to-r from-purple-900 to-black-600 text-white flex justify-between items-center px-8 shadow-lg font-sans z-50">
      <div className="logo flex items-center space-x-4">
        <div className="bg-white p-1 rounded-lg shadow-md">
          <img src="/src/assets/Logo_UnitEd.jpeg" alt="Logo" className="w-10 h-10 rounded" />
        </div>
        <div>
          <h1 className="font-bold text-xl tracking-wide">UnitEd</h1>
          
        </div>
      </div>

      <nav className="nav">
        <ul className="flex items-center gap-6">
          {user ? (
            <>
              
              <li>
                <Link to="/profile">
                  <img
                    src={user.profilePic || "./src/assets/user_icon.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                  />
                </Link>
              </li>

              <li>
                <Link to="/dashboard" className="hover:text-yellow-300 transition-colors duration-300 font-medium">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-yellow-300 transition-colors duration-300 font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors duration-300 shadow-md"
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              
              <li>
                <Link to="/profile">
                  <img
                    src={"./src/assets/user_icon.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                  />
                </Link>
              </li>

              <li>
                <Link to="/dashboard" className="hover:text-yellow-300 transition-colors duration-300 font-medium">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-yellow-300 transition-colors duration-300 font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors duration-300 shadow-md"
                >
                  Log Out
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}