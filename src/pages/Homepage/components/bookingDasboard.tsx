import React, { useEffect, useState } from 'react';

// Extend the window object to include KhaltiCheckout
declare global {
    interface Window {
        KhaltiCheckout: any;
    }
}
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { generateKhaltiConfig } from '../../../utils/loadKhalti';

interface Vehicle {
    _id: string;
    name: string;
    category: string;
    seat: number;
    types: string;
    price: number;
    description: string;
    location: string;
    numberPlate: string;
    imageURL: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
}

interface Booking {
    _id: string;
    vehicle: Vehicle;
    user: User;
    startDate: string;
    endDate: string;
    pickupLocation: string;
    totalPrice: number;
    status: string;
    createdAt: string;
    __v: number;
}

const BookingDashboard: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

    // Fetch user bookings
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/api/v1/my-bookings', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Raw API response:', response.data); // Debug log
                // Handle different response structures
                let fetchedBookings: Booking[] = [];
                if (Array.isArray(response.data.data)) {
                    fetchedBookings = response.data.data;
                } else if (Array.isArray(response.data.bookings)) {
                    fetchedBookings = response.data.bookings;
                } else if (Array.isArray(response.data)) {
                    fetchedBookings = response.data;
                }
                console.log('Processed bookings:', fetchedBookings); // Debug log
                setBookings(fetchedBookings);
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Failed to fetch bookings';
                setError(errorMessage);
                console.error('Error fetching bookings:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    // Open modal for cancellation
    const openCancelModal = (bookingId: string) => {
        setSelectedBookingId(bookingId);
        setModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setModalOpen(false);
        setSelectedBookingId(null);
    };

    // Handle booking cancellation
    const handleCancelBooking = async () => {
        if (!selectedBookingId) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/api/v1/cancel/${selectedBookingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBookings(bookings.filter((booking) => booking._id !== selectedBookingId));
            toast.success('Booking cancelled successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            closeModal();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to cancel booking', {
                position: 'top-right',
                autoClose: 3000,
            });
            console.error('Error cancelling booking:', error.response?.data || error.message);
            closeModal();
        }
    };

    const handlePayment = async (bookingId: string) => {
        try {
            const booking = bookings.find((booking) => booking._id === bookingId);
            if (!booking) {
                throw new Error("Unknown booking id");
            }

            const config = generateKhaltiConfig({
                identity: booking._id,
                productName: booking.vehicle.name,
            });

            const checkout = new window.KhaltiCheckout(config);
            checkout.show({ amount: booking.totalPrice * 100 }); // Khalti uses paisa

        } catch (error: any) {
            toast.error(error.message || 'Failed to initiate payment', {
                position: 'top-right',
                autoClose: 3000,
            });
            console.error('Error initializing payment:', error.message);
        }
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <ToastContainer />
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Bookings</h2>
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}
                    {bookings.length === 0 ? (
                        <p className="text-gray-600">You have no bookings.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Vehicle
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Start Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            End Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Pickup Location
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total Price
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {bookings.map((booking) => (
                                        <tr key={booking._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {booking.vehicle.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(booking.startDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(booking.endDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {booking.pickupLocation}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                ${booking.totalPrice}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {booking.status}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {booking.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handlePayment(booking._id)}
                                                            className="text-blue-600 hover:text-blue-800 mr-4"
                                                        >
                                                            Pay Now
                                                        </button>
                                                        <button
                                                            onClick={() => openCancelModal(booking._id)}
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for confirming cancellation */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Confirm Cancellation
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to cancel this booking?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleCancelBooking}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingDashboard;