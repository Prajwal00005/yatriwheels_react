import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ASSETS_URL } from '../../../constants';

interface Vehicle {
    _id: string;
    name: string;
    description: string;
    category: string;
    types: string;
    price: number;
    seat: number;
    location: string;
    numberPlate: string;
    createdBy: {
        _id: string;
        name: string;
    };
    imageURL: string;
    createdAt: string;
    updatedAt: string;
}

interface BookingFormInputs {
    startDate: string;
    endDate: string;
    pickupLocation: string;
}

const SingleCard: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormInputs>();

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3000/api/v1/vehicle/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setVehicle(response.data.data);
            } catch (error: any) {
                console.error("Error fetching vehicle:", error.response?.data || error.message);
            }
        };

        if (id) fetchVehicle();
    }, [id]);

    const onSubmit: SubmitHandler<BookingFormInputs> = async (data) => {
        setLoading(true);
        setError(null);

        // Calculate total price based on date range
        const start = new Date(data.startDate);
        const end = new Date(data.endDate);
        const days = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
        const totalPrice = vehicle ? vehicle.price * days : 0;

        const bookingData = {
            vehicle: id,
            startDate: new Date(data.startDate).toISOString(),
            endDate: new Date(data.endDate).toISOString(),
            pickupLocation: data.pickupLocation,
            totalPrice: totalPrice > 0 ? totalPrice : vehicle?.price, // Fallback to single day price
            status: 'pending'
        };

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/api/v1/create-booking', bookingData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            toast.success('Booking successfully created!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            reset(); // Clear the form
        } catch (error: any) {
            setError(error.response?.data?.message || 'Failed to create booking');
            console.error("Error creating booking:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!vehicle) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <ToastContainer />
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2">
                        <img
                            src={`${ASSETS_URL}/${vehicle.imageURL}`}
                            alt={vehicle.name}
                            className="h-96 w-full object-cover md:h-full"
                        />
                    </div>
                    <div className="p-8 md:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-900">{vehicle.name}</h2>
                        <p className="mt-3 text-gray-600 leading-relaxed">{vehicle.description}</p>

                        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Category</p>
                                <p className="font-medium text-gray-900">{vehicle.category}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Type</p>
                                <p className="font-medium text-gray-900">{vehicle.types}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Seats</p>
                                <p className="font-medium text-gray-900">{vehicle.seat}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Location</p>
                                <p className="font-medium text-gray-900">{vehicle.location}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Number Plate</p>
                                <p className="font-medium text-gray-900">{vehicle.numberPlate}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Price</p>
                                <p className="font-medium text-gray-900">${vehicle.price}/day</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-gray-50">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Book This Vehicle</h3>
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    id="startDate"
                                    {...register('startDate', { required: 'Start date is required' })}
                                    className={`mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.startDate ? 'border-red-500' : ''
                                        }`}
                                />
                                {errors.startDate && (
                                    <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    id="endDate"
                                    {...register('endDate', { required: 'End date is required' })}
                                    className={`mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.endDate ? 'border-red-500' : ''
                                        }`}
                                />
                                {errors.endDate && (
                                    <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
                                )}
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700">
                                    Pickup Location
                                </label>
                                <input
                                    type="text"
                                    id="pickupLocation"
                                    {...register('pickupLocation', { required: 'Pickup location is required' })}
                                    placeholder="Enter pickup location"
                                    className={`mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.pickupLocation ? 'border-red-500' : ''
                                        }`}
                                />
                                {errors.pickupLocation && (
                                    <p className="mt-1 text-sm text-red-600">{errors.pickupLocation.message}</p>
                                )}
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors duration-200 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            {loading ? 'Processing...' : 'Confirm Booking'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SingleCard;