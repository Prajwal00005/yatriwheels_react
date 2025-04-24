import React, { useState } from 'react';
import { useUser } from '../../../context/login_context';

const ProfilePage = () => {

    const userProfile = useUser();
    console.log(userProfile)
    const [user, setUser] = useState({
        name: userProfile?.name,
        email: userProfile?.email,
        phone: userProfile?.phone,
        address: userProfile?.address,
        password: "123",
        profilePic: null
    });

    const [editMode, setEditMode] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-100 sm:px-6 ">
            <div className="max-w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-indigo-600 py-6 px-8 text-white">
                    <h1 className="text-2xl font-bold">My Profile</h1>
                    <p className="text-indigo-100">Manage your account information</p>
                </div>

                {/* Profile Content */}
                <div className="p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Profile Picture */}
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                <img
                                    src={user.profilePic}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                                {editMode && (
                                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <label className="cursor-pointer p-2 bg-white bg-opacity-80 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <input
                                                type="file"
                                                className="hidden"

                                            />
                                        </label>
                                    </div>
                                )}
                            </div>
                            <h2 className="mt-4 text-xl font-semibold text-gray-800">{user.name}</h2>
                        </div>

                        {/* Profile Details */}
                        <div className="flex-1 space-y-6">
                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={user.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                                    />
                                ) : (
                                    <p className="mt-1 text-gray-900">{user.name}</p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                {editMode ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                                    />
                                ) : (
                                    <p className="mt-1 text-gray-900">{user.email}</p>
                                )}
                            </div>

                            {/* Phone Field (not editable) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <p className="mt-1 text-gray-900">{user.phone}</p>
                            </div>

                            {/* Address Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                {editMode ? (
                                    <textarea
                                        name="address"
                                        value={user.address}
                                        onChange={handleChange}
                                        rows={2}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                                    />
                                ) : (
                                    <p className="mt-1 text-gray-900">{user.address}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                {editMode ? (
                                    <input
                                        type="password"
                                        name="password"
                                        value={user.password}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                                    />
                                ) : (
                                    <p className="mt-1 text-gray-900">{user.password}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex justify-end space-x-3">
                        {editMode ? (
                            <>
                                <button
                                    onClick={() => setEditMode(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        // Save logic would go here
                                        setEditMode(false);
                                    }}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Save Changes
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setEditMode(true)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;