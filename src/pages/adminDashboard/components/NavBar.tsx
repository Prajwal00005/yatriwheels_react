import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../../context/login_context';

const NavBar = () => {
  const user = useUser();

  const [isHidden, setHidden] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the dropdown container

  const handleSignOut = () => {
    // Clear localStorage or call logout function from context
    localStorage.removeItem('token');
    window.location.href = '/'; // or use navigate('/login')
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setHidden(false); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside); // Listen for clicks
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup
    };
  }, []);

  return (
    <nav className='flex bg-primary w-full justify-between items-center h-16 px-7'>
      <h1 className='font-bold text-md md:text-2xl text-white'>
        Welcome! {user?.name}
      </h1>

      <div className='relative' ref={dropdownRef}>
        <button
          onClick={() => setHidden((prev) => !prev)}
          id="dropdownAvatarNameButton"
          data-dropdown-toggle="dropdownAvatarName"
          className="flex items-center text-sm pe-1 font-medium text-white rounded-full hover:text-blue-600 md:me-0 focus:ring-1 focus:ring-gray-100"
          type="button"
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 me-2 rounded-full"
            src={user?.avatar ? `http://localhost:3000/${user.avatar}` : "/avatar.jpg"}
            alt="user photo"
          />
          {user?.name}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {isHidden && (
          <div
            id="dropdownAvatarName"
            className="z-10 absolute top-9 -right-5 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44"
          >
            <div className="px-4 py-3 text-sm text-gray-900">
              <div className="font-medium">{user?.name}</div>
              <div className="truncate">{user?.email}</div>
            </div>
            <ul
              className="py-2 text-sm text-gray-700"
              aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
            >
              <li>
                <Link to="/" className="block px-4 py-2 hover:bg-gray-100">
                  Dashboard
                </Link>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Earnings
                </a>
              </li>
              <li>
                <Link
                  to={"/profile/" + 1}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </li>
            </ul>
            <div className="py-2">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleSignOut}
              >
                Sign out
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;