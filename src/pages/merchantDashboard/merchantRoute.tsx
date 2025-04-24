import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
// import Vehicle from './components/Vehicles';
import Booking from './components/Booking';
import ContactCard from './components/Contact';
import App from './App';
// import CreateVehicleForm from './components/createForm';
import UserVehicles from './components/Vehicles';
import CreateVehicleForm from './components/CreateForm';

const NotFound: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
                <p className="text-gray-600 mt-2">The page you're looking for doesn't exist.</p>
                <a href="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Go to Home
                </a>
            </div>
        </div>
    );
};

const MerchantRoute: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<App />}>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='create-vehicle' element={<CreateVehicleForm />} />
                <Route path='vehicle' element={<UserVehicles />} />
                <Route path='booking' element={<Booking />} />
                <Route path='contact' element={<ContactCard />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>

    );
};

export default MerchantRoute;