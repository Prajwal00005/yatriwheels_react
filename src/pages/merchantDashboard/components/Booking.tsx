
import axios from 'axios';
import React, { useState, useEffect } from 'react';

// Interface for Payment data from the API
interface Payment {
    _id: string;
    amount: number;
    paymentMethod: 'CASH' | 'MOBILEBANKING';
    paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
    booking: string;
    createdAt: string;
}

// Interface for API booking data
interface ApiBooking {
    _id: string;
    user: {
        _id: string;
        name: string;
        phone: string;
        email: string;
    };
    vehicle: {
        _id: string;
        name: string;
        category: string;
        seat: number;
        types: string;
        location: string;
        numberPlate: string;
        description: string;
        price: number;
        imageURL: string;
        vehicleStatus?: boolean;
        createdBy?: string;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
    };
    startDate: string;
    endDate: string;
    pickupLocation: string;
    totalPrice: number;
    fine?: number;
    status: 'pending' | 'confirmed' | 'canceled' | 'completed';
    payment?: Payment;
    createdAt: string;
    __v?: number;
}

// Interface for component booking data
interface Booking {
    id: string;
    customer: string;
    car: string;
    bookingDate: string;
    returnDate: string;
    location: string;
    status: 'Pending' | 'Confirmed' | 'Canceled' | 'Completed';
    fineAmount: number;
    paymentMethod?: 'CASH' | 'MOBILEBANKING';
    paymentStatus?: 'PENDING' | 'COMPLETED' | 'FAILED';
    totalAmount: number;
}

// Bookings Component
const Booking: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<string | null>(null);
    const [selectedBooking, setSelectedBooking] = useState<ApiBooking | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogError, setDialogError] = useState<string | null>(null);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Authentication token missing. Please log in again.');

            const response = await axios.get<{ success: string; message: string; data: ApiBooking[] }>(
                'http://localhost:3000/api/v1/get-book-vehicle',
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const mappedBookings: Booking[] = response.data.data.map((booking: ApiBooking) => ({
                id: booking._id,
                customer: booking.user.name,
                car: booking.vehicle.name,
                bookingDate: new Date(booking.startDate).toLocaleDateString(),
                returnDate: new Date(booking.endDate).toLocaleDateString(),
                location: booking.pickupLocation,
                status: booking.status.charAt(0).toUpperCase() + booking.status.slice(1) as 'Pending' | 'Confirmed' | 'Canceled' | 'Completed',
                fineAmount: booking.fine ?? 0,
                paymentMethod: booking.payment?.paymentMethod,
                paymentStatus: booking.payment?.paymentStatus,
                totalAmount: booking.totalPrice + (booking.fine || 0)
            }));

            setBookings(mappedBookings);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
        }
    };

    const fetchSingleBooking = async (bookingId: string) => {
        try {
            console.log(`Fetching booking with ID: ${bookingId}`);
            if (!bookingId) throw new Error('Booking ID is undefined or invalid');
            setDialogError(null);
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Authentication token missing. Please log in again.');

            const response = await axios.get(
                `http://localhost:3000/api/v1/get-booking/${bookingId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const bookingData = response.data.data || response.data.booking || response.data;
            if (!bookingData) throw new Error('No booking data found in response');

            console.log('Booking fetched:', bookingData);
            setSelectedBooking(bookingData);
            setIsDialogOpen(true);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch booking details';
            console.error('Error fetching booking:', errorMessage);
            setDialogError(errorMessage);
            setIsDialogOpen(true);
        }
    };

    const updateBookingStatus = async (bookingId: string, newStatus: Booking['status']) => {
        try {
            setLoading(bookingId);
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Authentication token missing. Please log in again.');

            let endpoint: string;
            switch (newStatus) {
                case 'Confirmed':
                    endpoint = `http://localhost:3000/api/v1/confirm-booking/${bookingId}`;
                    break;
                case 'Canceled':
                    endpoint = `http://localhost:3000/api/v1/cancel-booking/${bookingId}`;
                    break;
                case 'Completed':
                    endpoint = `http://localhost:3000/api/v1/completed-booking/${bookingId}`;
                    break;
                default:
                    throw new Error('Invalid status');
            }

            await axios.patch(
                endpoint,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (newStatus === 'Completed') {
                await axios.post(
                    `http://localhost:3000/api/v1/${bookingId}/calculate`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }

            await fetchBookings();
            if (selectedBooking?._id === bookingId) {
                setIsDialogOpen(false);
                setSelectedBooking(null);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : `Failed to update booking status to ${newStatus}`);
        } finally {
            setLoading(null);
        }
    };

    const processCashPayment = async (bookingId: string) => {
        try {
            setLoading(`payment-${bookingId}`);
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Authentication token missing.');

            await axios.post(
                `http://localhost:3000/api/v1/checkout/${bookingId}`,
                { paymentMethod: 'CASH' },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            await axios.patch(
                `http://localhost:3000/api/v1/confirm/${bookingId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            await fetchBookings();
            if (selectedBooking?._id === bookingId) {
                setIsDialogOpen(false);
                setSelectedBooking(null);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Payment processing failed');
        } finally {
            setLoading(null);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const getStatusButtonClass = (status: Booking['status']) => {
        switch (status) {
            case 'Confirmed': return 'bg-green-500 text-white hover:bg-green-600';
            case 'Pending': return 'bg-yellow-500 text-white hover:bg-yellow-600';
            case 'Canceled': return 'bg-red-500 text-white hover:bg-red-600';
            case 'Completed': return 'bg-blue-500 text-white hover:bg-blue-600';
            default: return 'bg-gray-500 text-white hover:bg-gray-600';
        }
    };

    const closeDialog = () => {
        console.log('Closing dialog');
        setIsDialogOpen(false);
        setSelectedBooking(null);
        setDialogError(null);
    };

    return (
        <section className="p-4 ml-16 md:ml-64 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center justify-between">
                    Bookings
                    <span className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">View All</span>
                </h3>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 shadow-sm">
                        {error}
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 tracking-wider">Customer</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 tracking-wider">Car</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 tracking-wider">Booking Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 tracking-wider">Return Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 tracking-wider">Location</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 tracking-wider">Fine</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 tracking-wider">Payment Method</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {bookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                                            <span
                                                className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium"
                                                onClick={() => booking.id && fetchSingleBooking(booking.id)}
                                            >
                                                {booking.customer}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{booking.car}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{booking.bookingDate}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{booking.returnDate}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{booking.location}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusButtonClass(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 font-medium">
                                            {booking.fineAmount ? `$${booking.fineAmount.toFixed(2)}` : '$0.00'}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                                            {booking.paymentMethod ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-700">{booking.paymentMethod}</span>
                                                    {booking.paymentMethod === 'MOBILEBANKING' && booking.paymentStatus === 'COMPLETED' && (
                                                        <span className="text-green-600 text-xs font-semibold">Payment Completed</span>
                                                    )}
                                                </div>
                                            ) : (
                                                '-'
                                            )}
                                            {booking.status === 'Completed' && (!booking.paymentStatus || booking.paymentStatus !== 'COMPLETED') && (
                                                <button
                                                    onClick={() => processCashPayment(booking.id)}
                                                    className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                                    disabled={loading === `payment-${booking.id}`}
                                                >
                                                    {loading === `payment-${booking.id}` ? 'Processing...' : 'Pay Cash'}
                                                </button>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap flex gap-2">
                                            <button
                                                onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                                                className="px-2 py-1 text-xs bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                                disabled={booking.status === 'Confirmed' || booking.status === 'Completed' || loading === booking.id}
                                            >
                                                {loading === booking.id && booking.status === 'Pending' ? 'Processing...' : 'Accept'}
                                            </button>
                                            <button
                                                onClick={() => updateBookingStatus(booking.id, 'Canceled')}
                                                className="px-2 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                                disabled={booking.status === 'Canceled' || booking.status === 'Completed' || loading === booking.id}
                                            >
                                                {loading === booking.id && booking.status !== 'Canceled' && booking.status !== 'Completed' ? 'Processing...' : 'Reject'}
                                            </button>
                                            <button
                                                onClick={() => updateBookingStatus(booking.id, 'Completed')}
                                                className="px-2 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                                disabled={booking.status !== 'Confirmed' || loading === booking.id}
                                            >
                                                {loading === booking.id && booking.status === 'Confirmed' ? 'Processing...' : 'Complete'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {isDialogOpen && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 ">
                        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-6 m-4 relative">
                            <button
                                onClick={closeDialog}
                                className="text-red-500 absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg font-bold"
                            >
                                ×
                            </button>
                            <h3 className="text-xl font-semibold text-gray-800 mb-6">Booking Details</h3>
                            {dialogError ? (
                                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6">
                                    {dialogError}
                                </div>
                            ) : selectedBooking ? (
                                <div className="space-y-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* User Details */}
                                        <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                                            <h4 className="text-lg font-semibold text-gray-700 mb-3">User Details</h4>
                                            <div className="space-y-2 text-sm text-gray-600">
                                                <p><strong>Name:</strong> {selectedBooking.user.name}</p>
                                                <p><strong>Email:</strong> {selectedBooking.user.email}</p>
                                                <p><strong>Phone:</strong> {selectedBooking.user.phone}</p>
                                            </div>
                                        </div>
                                        {/* Vehicle Details */}
                                        <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                                            <h4 className="text-lg font-semibold text-gray-700 mb-3">Vehicle Details</h4>
                                            <div className="space-y-2 text-sm text-gray-600">
                                                <p><strong>Name:</strong> {selectedBooking.vehicle.name}</p>
                                                <p><strong>Number Plate:</strong> {selectedBooking.vehicle.numberPlate}</p>
                                                <p><strong>Location:</strong> {selectedBooking.vehicle.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Booking Details */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="text-lg font-semibold text-gray-700 mb-3">Booking Details</h4>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p><strong>Booking Date:</strong> {new Date(selectedBooking.startDate).toLocaleDateString()}</p>
                                            <p><strong>Return Date:</strong> {new Date(selectedBooking.endDate).toLocaleDateString()}</p>

                                            <p><strong>Total Price:</strong> ${selectedBooking.totalPrice}</p>
                                            <p><strong>Status:</strong> {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}</p>
                                            <p className="text-red-600"><strong>Fine:</strong> {selectedBooking.fine ? `$${selectedBooking.fine.toFixed(2)}` : '$0.00'}</p>
                                            <p><strong>Payment Method:</strong> {selectedBooking.payment?.paymentMethod || '-'}</p>
                                            {selectedBooking.payment?.paymentMethod === 'MOBILEBANKING' && selectedBooking.payment?.paymentStatus === 'COMPLETED' ? (
                                                <p className="text-green-600"><strong>Payment Status:</strong> Payment Completed</p>
                                            ) : (
                                                <p><strong>Payment Status:</strong> {selectedBooking.payment?.paymentStatus || 'Not Paid'}</p>
                                            )}
                                            {selectedBooking.status === 'completed' && (!selectedBooking.payment?.paymentStatus || selectedBooking.payment?.paymentStatus !== 'COMPLETED') && (
                                                <button
                                                    onClick={() => processCashPayment(selectedBooking._id)}
                                                    className="mt-3 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                                    disabled={loading === `payment-${selectedBooking._id}`}
                                                >
                                                    {loading === `payment-${selectedBooking._id}` ? 'Processing...' : 'Pay in Cash'}
                                                </button>
                                            )}
                                            <p><strong>Created At:</strong> {new Date(selectedBooking.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-600">Loading booking details...</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Booking;