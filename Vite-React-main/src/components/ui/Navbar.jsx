import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  // Temporary user variable (pretend user is not logged in)
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const activeLink =
    "text-blue-500 font-semibold border-b-2 border-blue-500 pb-1";
  const normalLink =
    "text-gray-700 hover:text-blue-500 transition duration-200";

  // Dummy logout function
  const logout = () => {
    alert("Logout clicked (Auth not yet connected)");
    setUser(null);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <h1 className="text-2xl font-bold text-blue-600">CrewAI</h1>

        <button
          className="md:hidden text-2xl text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          ☰
        </button>

        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:space-x-8 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none`}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
          </li>

          {!user ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="text-red-500 hover:text-red-600 font-medium"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
