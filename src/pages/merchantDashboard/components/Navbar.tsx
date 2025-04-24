import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../../context/login_context';

const Navbar: React.FC = () => {
    const user = useUser();


    return (
        <nav
            className="bg-gray-800 text-white w-16 md:w-64 h-screen fixed top-0 left-0 flex flex-col transition-all duration-300"
            role="navigation"
        >
            <div className="p-4 flex items-center gap-3">
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

                <div className="hidden md:block">
                    <h3 className="text-lg font-semibold">{user?.name || 'Guest'}</h3>
                    <span className="text-sm text-gray-400">{user?.email || 'Not logged in'}</span>
                </div>
            </div>
            <div className="p-4 flex-1">
                <ul className="space-y-2">
                    <li>
                        <NavLink
                            to="/merchant/dashboard"
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                            }
                        >
                            <i className="las la-tachometer-alt text-xl"></i>
                            <span className="hidden md:inline">Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/merchant/create-vehicle"
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                            }
                        >
                            <i className="las la-users text-xl"></i>
                            <span className="hidden md:inline">Create Vehicle</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/merchant/vehicle"
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                            }
                        >
                            <i className="las la-car text-xl"></i>
                            <span className="hidden md:inline">My Vehicles</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/merchant/booking"
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                            }
                        >
                            <i className="las la-calendar text-xl"></i>
                            <span className="hidden md:inline">Bookings</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/merchant/contact"
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                            }
                        >
                            <i className="las la-users text-xl"></i>
                            <span className="hidden md:inline">Contact</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;





