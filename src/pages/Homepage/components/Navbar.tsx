import React, { useState } from 'react';
import { useUser } from '../../../context/login_context';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const user = useUser();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleSignOut = () => {
        // Clear localStorage or call logout function from context
        localStorage.removeItem('token');
        window.location.href = '/'; // or use navigate('/login')
    };

    return (
        <nav className="bg-white border-gray-200 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo */}
                <a href="/" className="flex items-center space-x-3">
                    <img
                        src="logo_trial.png"
                        className="h-10"
                        alt="Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        YatriWheels
                    </span>
                </a>

                {/* Right Side */}
                <div className="flex items-center space-x-3">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex text-sm bg-gray-800 rounded-full focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
                            >
                                {user ? (
                                    <img
                                        className="w-8 h-8 rounded-full object-cover"
                                        src={user.avatar || "/avatar.jpg"}
                                        alt="user avatar"
                                    />
                                ) : (
                                    <img
                                        className="w-8 h-8 rounded-full object-cover"
                                        src="/avatar.jpg"
                                        alt="default avatar"
                                    />
                                )}

                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 z-50">
                                    <div className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                                        <div>{user.name}</div>
                                        <div className="font-medium truncate text-gray-500 dark:text-gray-400">
                                            {user.email}
                                        </div>
                                    </div>
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                        <li>
                                            <Link
                                                to={"/profile/" + 1}
                                                className="block px-4 py-2 hover:bg-gray-100"
                                            >
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/booking" className="block px-4 py-2 hover:bg-gray-100 ">
                                                Dashboard
                                            </Link>
                                        </li>

                                        <li>
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100 "
                                            >
                                                Sign out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex space-x-4">
                            <a href="/login" className="text-sm text-blue-600 hover:underline">Login</a>
                            <a href="/register" className="text-sm text-blue-600 hover:underline">Register</a>
                        </div>
                    )}

                    {/* Mobile Nav Toggle (optional) */}
                    <button
                        type="button"
                        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 20 20">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h14M3 12h14M3 18h14" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
