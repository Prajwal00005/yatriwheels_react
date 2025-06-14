import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { z } from "zod";

// Zod schema for vehicle validation
const VehicleSchema = z.object({
    image: z
        .instanceof(File)
        .optional()
        .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
            message: "Image must be less than 5MB",
        })
        .refine((file) => !file || ["image/jpeg", "image/png", "image/gif"].includes(file.type), {
            message: "Only JPEG, PNG, or GIF images are allowed",
        }),
    name: z.string().min(1, "Name is required").max(100, "Name must be 100 characters or less"),
    category: z.string().min(1, "Category is required").max(50, "Category must be 50 characters or less"),
    types: z.string().min(1, "Type is required").max(50, "Type must be 50 characters or less"),
    seat: z
        .number({ invalid_type_error: "Seats must be a number" })
        .min(1, "At least 1 seat is required")
        .max(100, "Seats cannot exceed 100"),
    location: z.string().min(1, "Location is required").max(100, "Location must be 100 characters or less"),
    price: z
        .number({ invalid_type_error: "Price must be a number" })
        .min(0, "Price cannot be negative")
        .max(10000, "Price cannot exceed 10,000"),
    numberPlate: z
        .string()
        .min(1, "Number plate is required")
        .max(20, "Number plate must be 20 characters or less"),
    description: z
        .string()
        .min(1, "Description is required")
        .max(500, "Description must be 500 characters or less"),
});

type TVehicleSchema = z.infer<typeof VehicleSchema>;

// Interface for vehicle data
interface Vehicle extends TVehicleSchema {
    _id: string;
    createdBy: string;
}

// Service functions
const getVehiclesByUser = async (retryCount = 0): Promise<Vehicle[]> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Authorization token not found in local storage");
    }

    try {
        const response = await axios.get("http://localhost:3000/api/v1/vehicle", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data as Vehicle[];
    } catch (error: any) {
        console.error("Error fetching vehicles:", {
            status: error.response?.status,
            message: error.response?.data?.message,
            error: error.message,
        });

        if (error.response?.status === 401) {
            throw new Error("Authentication failed. Please log in again.");
        }
        if (error.response?.status === 403) {
            throw new Error("Access denied. You are not authorized to view these vehicles.");
        }
        if (error.response?.status === 404) {
            throw new Error("No vehicles found for this user.");
        }
        if (retryCount < 2 && error.code === "ECONNREFUSED") {
            console.log(`Retrying fetch (attempt ${retryCount + 2})...`);
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1s
            return getVehiclesByUser(retryCount + 1);
        }
        throw new Error(error.response?.data?.message || "Failed to fetch vehicles");
    }
};

const updateVehicle = async (id: string, data: TVehicleSchema): Promise<string> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Authorization token not found");

    const formData = new FormData();
    formData.set("name", data.name);
    formData.set("category", data.category);
    formData.set("types", data.types);
    formData.set("seat", data.seat.toString());
    formData.set("location", data.location);
    formData.set("price", data.price.toString());
    formData.set("numberPlate", data.numberPlate);
    formData.set("description", data.description);
    if (data.image) formData.set("image", data.image);

    try {
        const response = await axios.patch(`http://localhost:3000/api/v1/update/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.message || "Vehicle updated successfully";
    } catch (error: any) {
        console.error("Error updating vehicle:", {
            status: error.response?.status,
            message: error.response?.data?.message,
            error: error.message,
        });
        if (error.response?.status === 401) {
            throw new Error("Authentication failed. Please log in again.");
        }
        if (error.response?.status === 403) {
            throw new Error("Access denied. You are not authorized to update this vehicle.");
        }
        if (error.response?.status === 404) {
            throw new Error("Vehicle not found.");
        }
        throw new Error(error.response?.data?.message || "Failed to update vehicle");
    }
};

const deleteVehicle = async (vehicleId: string): Promise<string> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Authentication token missing");
    }

    try {
        const response = await axios.delete(`http://localhost:3000/api/v1/delete/${vehicleId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("deleteVehicle response:", response.data);
        return response.data.message || "Vehicle deleted successfully";
    } catch (error: any) {
        console.error("Error deleting vehicle:", {
            status: error.response?.status,
            message: error.response?.data?.message,
            error: error.message,
        });
        if (error.response?.status === 401) {
            throw new Error("Authentication failed. Please log in again.");
        }
        if (error.response?.status === 403) {
            throw new Error("Access denied. You are not authorized to delete this vehicle.");
        }
        if (error.response?.status === 404) {
            throw new Error("Vehicle not found.");
        }
        throw new Error(error.response?.data?.message || "Failed to delete vehicle");
    }
};

const UserVehicles: React.FC = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
    const [deletingVehicle, setDeletingVehicle] = useState<Vehicle | null>(null);
    const [formData, setFormData] = useState<Partial<TVehicleSchema>>({});
    const [formErrors, setFormErrors] = useState<Partial<Record<keyof TVehicleSchema, string>>>({});

    // Fetch vehicles on mount
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const data = await getVehiclesByUser();
                setVehicles(data);
            } catch (e: any) {
                toast.error(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchVehicles();
    }, []);

    // Handle edit button click
    const handleEdit = (vehicle: Vehicle) => {
        setEditingVehicle(vehicle);
        setFormData({
            name: vehicle.name,
            category: vehicle.category,
            types: vehicle.types,
            seat: vehicle.seat,
            location: vehicle.location,
            price: vehicle.price,
            numberPlate: vehicle.numberPlate,
            description: vehicle.description,
        });
        setFormErrors({});
    };

    // Handle delete button click
    const handleDeleteClick = (vehicle: Vehicle) => {
        setDeletingVehicle(vehicle);
    };

    // Confirm delete action
    const confirmDelete = async () => {
        if (!deletingVehicle) return;
        try {
            const message = await deleteVehicle(deletingVehicle._id);
            toast.success(message);
            setVehicles((prev) => prev.filter((v) => v._id !== deletingVehicle._id));
            setDeletingVehicle(null);
        } catch (e: any) {
            toast.error(e.message);
            setDeletingVehicle(null);
        }
    };

    // Handle form input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    // Handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFormData((prev) => ({ ...prev, image: file }));
        setFormErrors((prev) => ({ ...prev, image: undefined }));
    };

    // Handle form submission for update
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingVehicle) return;

        try {
            const validatedData = VehicleSchema.parse({
                ...formData,
                seat: Number(formData.seat),
                price: Number(formData.price),
            });
            const message = await updateVehicle(editingVehicle._id, validatedData);
            toast.success(message);
            setVehicles((prev) =>
                prev.map((v) => (v._id === editingVehicle._id ? { ...v, ...validatedData } : v))
            );
            setEditingVehicle(null);
            setFormData({});
            setFormErrors({});
        } catch (e: any) {
            if (e instanceof z.ZodError) {
                const errors = e.errors.reduce((acc, err) => {
                    acc[err.path[0] as keyof TVehicleSchema] = err.message;
                    return acc;
                }, {} as Partial<Record<keyof TVehicleSchema, string>>);
                setFormErrors(errors);
            } else {
                toast.error(e.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 ml-16 md:ml-64">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-extrabold text-gray-800 tracking-tight">My Vehicles</h3>
                <a
                    href="/all-vehicles"
                    className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center gap-2 transition-colors"
                    aria-label="See all vehicles"
                >
                    See All Vehicles
                    <i className="las la-arrow-right text-lg"></i>
                </a>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : vehicles.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-lg font-medium text-gray-500">No vehicles found.</p>
                </div>
            ) : (
                /* Modern Table */
                <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                                <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider rounded-tl-xl">Name</th>
                                <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider">Category</th>
                                <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider">Type</th>
                                <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider">Seats</th>
                                <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider">Location</th>
                                <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider">Price</th>
                                <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider">Number Plate</th>
                                <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider">Description</th>
                                <th className="p-4 text-left font-semibold text-sm uppercase tracking-wider rounded-tr-xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.map((vehicle, index) => (
                                <tr
                                    key={vehicle._id}
                                    className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-200"
                                >
                                    <td className="p-4 text-gray-700 font-medium">{vehicle.name}</td>
                                    <td className="p-4 text-gray-700">{vehicle.category}</td>
                                    <td className="p-4 text-gray-700">{vehicle.types}</td>
                                    <td className="p-4 text-gray-700">{vehicle.seat}</td>
                                    <td className="p-4 text-gray-700">{vehicle.location}</td>
                                    <td className="p-4 text-gray-700 font-medium">${vehicle.price}</td>
                                    <td className="p-4 text-gray-700">{vehicle.numberPlate}</td>
                                    <td className="p-4 text-gray-600 text-sm max-w-xs truncate">{vehicle.description}</td>
                                    <td className="p-4 flex gap-3 items-center">
                                        <button
                                            onClick={() => handleEdit(vehicle)}
                                            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
                                            aria-label={`Edit vehicle ${vehicle.name}`}
                                        >
                                            <i className="las la-edit mr-1"></i> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(vehicle)}
                                            className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
                                            aria-label={`Delete vehicle ${vehicle.name}`}
                                        >
                                            <i className="las la-trash mr-1"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Edit Modal */}
            {editingVehicle && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center  z-50 animate-fadeIn">
                    <div className="bg-white rounded-xl p-6 w-full max-w-[80%] h-[80%] overflow-y-auto shadow-xl transform transition-all duration-300 animate-scaleIn">
                        <div className="flex justify-between items-start mb-6 sticky top-0 bg-white z-10 pt-2 pb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Edit Vehicle Details</h2>
                                <p className="text-sm text-gray-500 mt-1">Update the information below</p>
                            </div>
                            <button
                                onClick={() => setEditingVehicle(null)}
                                className="text-gray-400 hover:text-gray-600 text-2xl transition-colors p-1 -mt-2 -mr-2"
                                aria-label="Close modal"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-6 pb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Name Field */}
                                <div className="space-y-1">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Vehicle Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name || ""}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        aria-invalid={!!formErrors.name}
                                    />
                                    {formErrors.name && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                                    )}
                                </div>

                                {/* Location Field */}
                                <div className="space-y-1">
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                        Location <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location || ""}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        aria-invalid={!!formErrors.location}
                                    />
                                    {formErrors.location && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.location}</p>
                                    )}
                                </div>

                                {/* Price Field */}
                                <div className="space-y-1">
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                        Price (per day) <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                        <input
                                            type="number"
                                            id="price"
                                            name="price"
                                            min="0"
                                            step="0.01"
                                            value={formData.price || ""}
                                            onChange={handleInputChange}
                                            className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            aria-invalid={!!formErrors.price}
                                        />
                                    </div>
                                    {formErrors.price && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.price}</p>
                                    )}
                                </div>

                                {/* Number Plate Field */}
                                <div className="space-y-1">
                                    <label htmlFor="numberPlate" className="block text-sm font-medium text-gray-700">
                                        License Plate <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="numberPlate"
                                        name="numberPlate"
                                        value={formData.numberPlate || ""}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all uppercase"
                                        aria-invalid={!!formErrors.numberPlate}
                                    />
                                    {formErrors.numberPlate && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.numberPlate}</p>
                                    )}
                                </div>
                            </div>

                            {/* Description Field */}
                            <div className="space-y-1">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[120px]"
                                    aria-invalid={!!formErrors.description}
                                />
                                {formErrors.description && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                                )}
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-1">
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                    Vehicle Image
                                </label>
                                <div className="mt-1 flex items-center gap-4">
                                    <label className="flex flex-col items-center justify-center w-full cursor-pointer">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors w-full">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 text-center">
                                                <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
                                        </div>
                                        <input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                {formErrors.image && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.image}</p>
                                )}
                            </div>

                            {/* Action Buttons - Sticky at bottom */}
                            <div className="sticky bottom-0 bg-white py-4 -mb-6 border-t border-gray-200">
                                <div className="flex justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setEditingVehicle(null)}
                                        className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm hover:shadow-md"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {deletingVehicle && (
                <div className="fixed inset-0 bg-black/40 bg-opacity-60 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl transform transition-all duration-300">
                        <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight mb-4">Confirm Deletion</h2>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete <span className="font-semibold text-gray-800">{deletingVehicle.name}</span>?
                            This action cannot be undone.
                        </p>
                        <div className="flex gap-4 justify-end">
                            <button
                                onClick={() => setDeletingVehicle(null)}
                                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg"
                                aria-label="Cancel deletion"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg"
                                aria-label={`Confirm delete vehicle ${deletingVehicle.name}`}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserVehicles;