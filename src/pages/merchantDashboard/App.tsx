import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const App: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-1 w-full p-4 ml-0 md:ml-64 transition-all duration-300" role="main">
                <Suspense fallback={<div className="text-center text-gray-600">Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    );
};

export default App;