import React, { useEffect, useState } from 'react';
import DeleteModel from '../Dialog/DeleteModel';
import EditModel from '../Dialog/EditModel';
import { toast } from 'react-toastify';
import { deleteVehicle, vehicleFetch, updateVehicle } from '../API/UserAPi';

interface Vehicle {
    _id: string;
    name: string;
    createdBy: { _id: string; name: string };
    types: string;
    price: string;
}

const VehiclesTable: React.FC = () => {
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const ondeleteVehicle = async (id: string) => {
        try {
            setIsLoading(true);
            await deleteVehicle(id);
            setVehicleList((prev) => prev.filter((vehicle) => vehicle._id !== id));
            toast.success('Vehicle deleted successfully');
            setOpenDeleteModel(false);
            if (currentItems.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        } catch (e: any) {
            console.error('Delete error:', e);
            toast.error(e.response?.data?.message || 'Failed to delete vehicle');
        } finally {
            setIsLoading(false);
        }
    };

    const onUpdateVehicle = async (id: string, data: Partial<Vehicle>) => {
        try {
            setIsLoading(true);
            const updated = await updateVehicle(id, data);
            setVehicleList((prev) =>
                prev.map((vehicle) => (vehicle._id === id ? { ...vehicle, ...updated } : vehicle))
            );
            toast.success('Vehicle updated successfully');
            setOpenEditModel(false);
            setSelectedVehicle(null);
        } catch (e: any) {
            console.error('Update error:', e);
            toast.error(e.response?.data?.message || 'Failed to update vehicle');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const vehicles = await vehicleFetch();
                setVehicleList(vehicles);
            } catch (e: any) {
                toast.error(e.response?.data?.message || 'Error fetching vehicles');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredVehicles = vehicleList.filter((vehicle) => {
        const searchLower = searchTerm.toLowerCase();
        const nameMatch = vehicle.name?.toLowerCase()?.includes(searchLower) || false;
        const typeMatch = vehicle.types?.toLowerCase()?.includes(searchLower) || false;
        return nameMatch || typeMatch;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredVehicles.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    const onOpenDeleteModel = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setOpenDeleteModel(true);
    };

    const onCloseDeleteModel = () => {
        setOpenDeleteModel(false);
        setSelectedVehicle(null);
    };

    const onOpenEditModel = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setOpenEditModel(true);
    };

    const onCloseEditModel = () => {
        setOpenEditModel(false);
        setSelectedVehicle(null);
    };

    const onConfirmDelete = () => {
        if (selectedVehicle) {
            ondeleteVehicle(selectedVehicle._id);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name or type..."
                    className="w-full max-w-md p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
                />
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                        Loading...
                                    </td>
                                </tr>
                            ) : currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                        No vehicles found
                                    </td>
                                </tr>
                            ) : (
                                currentItems.map((vehicle, index) => (
                                    <tr key={vehicle._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {indexOfFirstItem + index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.createdBy?.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${vehicle.types === 'SUV'
                                                    ? 'bg-green-100 text-green-800'
                                                    : vehicle.types === 'Truck'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-purple-100 text-purple-800'
                                                    }`}
                                            >
                                                {vehicle.types}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ${parseFloat(vehicle.price).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => onOpenEditModel(vehicle)}
                                                className="mr-2 text-blue-600 hover:text-blue-900"
                                                disabled={isLoading}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => onOpenDeleteModel(vehicle)}
                                                className="text-red-600 hover:text-red-900"
                                                disabled={isLoading}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                                <span className="font-medium">{Math.min(indexOfLastItem, filteredVehicles.length)}</span> of{' '}
                                <span className="font-medium">{filteredVehicles.length}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    Previous
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => paginate(i + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${currentPage === i + 1 ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    Next
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {openDeleteModel && selectedVehicle && (
                <DeleteModel onClose={onCloseDeleteModel} onConfirm={onConfirmDelete} isLoading={isLoading} />
            )}
            {openEditModel && selectedVehicle && (
                <EditModel vehicle={selectedVehicle} onClose={onCloseEditModel} onSave={onUpdateVehicle} isLoading={isLoading} />
            )}
        </div>
    );
};

export default VehiclesTable;