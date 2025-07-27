import React, { useState } from 'react';
import { useUser } from '../../../context/login_context';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const user = useUser();
    console.log('User data:', user);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    // Toggle dropdown for user menu
    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    // Handle sign-out
    const handleSignOut = () => {
        localStorage.removeItem('token');
        setDropdownOpen(false);
        navigate('/login');
    };

    // Handle mobile menu toggle
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setMobileMenuOpen((prev) => !prev);
    };

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo */}
                <a href="/" className="flex items-center space-x-3">
                    <img
                        src="/logo_trial.png"
                        className="h-12 w-12 object-contain"
                        alt="YatriWheels Logo"
                        onError={(e) => {
                            e.currentTarget.src = '/fallback-logo.png';
                        }}
                    />
                    <span className="self-center text-2xl font-bold tracking-tight">YatriWheels</span>
                </a>

                {/* Right Side */}
                <div className="flex items-center space-x-4">
                    <Link
                        to={`/booking`}
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 hover:bg-white hover:text-blue-500 bg-blue-600 text-white  transition-colors duration-200 mx-8 rounded-lg shadow-lg"
                    >
                        <i className="las la-user mr-2"></i> Booking Dashboard
                    </Link>
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center text-sm rounded-full focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200"
                                aria-label="User menu"
                                aria-expanded={dropdownOpen}
                            >
                                <img
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                                    src={user?.avatar ? `http://localhost:3000/${user.avatar}` : '/avatar.jpg'}
                                    alt="User avatar"
                                    onError={(e) => {
                                        e.currentTarget.src = '/avatar.jpg';
                                    }}
                                />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl z-50 transform transition-all duration-200 origin-top-right">
                                    <div className="px-4 py-3 border-b border-gray-200">
                                        <div className="text-base font-semibold text-gray-800">{user.name}</div>
                                        <div className="text-sm text-gray-500 truncate">{user.email}</div>
                                    </div>
                                    <ul className="py-2 text-sm text-gray-700">

                                        <li>
                                            <Link
                                                to={`/profile/${user.id || 1}`}
                                                onClick={() => setDropdownOpen(false)}
                                                className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                            >
                                                <i className="las la-user mr-2"></i> Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/booking"
                                                onClick={() => setDropdownOpen(false)}
                                                className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                            >
                                                <i className="las la-tachometer-alt mr-2"></i> Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                            >
                                                <i className="las la-sign-out-alt mr-2"></i> Sign out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="hidden md:flex space-x-6">
                            <a
                                href="/login"
                                className="text-sm font-medium text-white hover:text-blue-200 transition-colors duration-200"
                            >
                                Login
                            </a>
                            <a
                                href="/register"
                                className="text-sm font-medium text-white bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-400 transition-all duration-200 shadow-md"
                            >
                                Register
                            </a>
                        </div>
                    )}

                    {/* Mobile Nav Toggle */}
                    <button
                        type="button"
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 rounded-lg text-white hover:bg-blue-700 transition-all duration-200"
                        aria-label="Toggle mobile menu"
                        aria-expanded={mobileMenuOpen}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && !user && (
                <div className="md:hidden bg-blue-700 px-4 py-3">
                    <div className="flex flex-col space-y-3">
                        <a
                            href="/login"
                            className="text-sm font-medium text-white hover:text-blue-200 transition-colors duration-200 py-2"
                        >
                            Login
                        </a>
                        <a
                            href="/register"
                            className="text-sm font-medium text-white hover:text-blue-200 transition-colors duration-200 py-2"
                        >
                            Register
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;