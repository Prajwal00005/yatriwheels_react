import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../../context/login_context';

const Navbar: React.FC = () => {
    const user = useUser();

    console.log(user)

    const handleSignOut = () => {
        // Clear localStorage or call logout function from context
        localStorage.removeItem('token');
        window.location.href = '/'; // or use navigate('/login')
    };
    return (
        <nav
            className="shadow-lg text-white w-16 md:w-64 h-screen fixed top-0 left-0 flex flex-col transition-all duration-300"
            role="navigation"
        >
            <div className="p-4 flex items-center gap-3">
                {user ? (
                    <img
                        className="w-8 h-8 rounded-full object-cover"
                        src={user.avatar ? `http://localhost:3000/${user.avatar}` : "avatar.jpg"}
                        alt="user avatar"
                    />
                ) : (
                    <img
                        className="w-8 h-8 rounded-full object-cover"
                        src="/avatar.jpg"
                        alt="default avatar"
                    />
                )}

                <div className="hidden md:block text-secondary">
                    <h3 className="text-lg font-semibold">{user?.name || 'Guest'}</h3>
                    <span className="text-sm ">{user?.email || 'Not logged in'}</span>
                </div>
            </div>
            <div className="p-4 flex-1">
                <ul className="space-y-2 text-primary text-xl font-bold">
                    <li>
                        <NavLink
                            to="/merchant/dashboard"
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-secondary' : ''}`
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
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-secondary' : ''}`
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
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-secondary' : ''}`
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
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-secondary' : ''}`
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
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-secondary' : ''}`
                            }
                        >
                            <i className="las la-users text-xl"></i>
                            <span className="hidden md:inline">Contact</span>
                        </NavLink>
                    </li>
                </ul>
                <div className='p-2 bg-white shadow-lg mt-50 rounded-lg text-center text-black font-bold hover:scale-102' onClick={handleSignOut}>Log out</div>
            </div>
        </nav>
    );
};

export default Navbar;





