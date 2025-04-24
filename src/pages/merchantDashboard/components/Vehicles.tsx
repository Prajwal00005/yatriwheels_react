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
        // console.log("Fetch vehicles response:", response.data); // Debug log
        return response.data.data as Vehicle[];
    } catch (error: any) {
        console.error("Error fetching vehicles:", {
            status: error.response?.status,
            message: error.response?.data?.message,
            error: error.message,
        });

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
        const response = await axios.put(`http://localhost:3000/api/v1/update/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.message || "Vehicle updated successfully";
    } catch (error: any) {
        console.error("Error updating vehicle:", error);
        if (error.response?.status === 403) {
            throw new Error("Access denied. You are not authorized to update this vehicle.");
        }
        throw new Error(error.response?.data?.message || "Failed to update vehicle");
    }
};

const deleteVehicle = async (id: string): Promise<string> => {
    console.log(id)
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Authorization token not found");

    try {
        const response = await axios.delete(`http://localhost:3000/api/v1/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.message || "Vehicle deleted successfully";
    } catch (error: any) {
        console.error("Error deleting vehicle:", error);
        if (error.response?.status === 403) {
            throw new Error("Access denied. You are not authorized to delete this vehicle.");
        }
        throw new Error(error.response?.data?.message || "Failed to delete vehicle");
    }
};

const UserVehicles: React.FC = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
    const [formData, setFormData] = useState<Partial<TVehicleSchema>>({});

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
    };

    // Handle form input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFormData((prev) => ({ ...prev, image: file }));
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
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    // Handle delete button click
    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this vehicle?")) return;

        try {
            const message = await deleteVehicle(id);
            toast.success(message);
            setVehicles((prev) => prev.filter((v) => v._id !== id));
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    return (
        <div className="p-6 p-4 ml-16 md:ml-64">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">My Vehicles</h3>
                <small className="text-gray-500 cursor-pointer">
                    See all vehicles <i className="las la-arrow-right"></i>
                </small>
            </div>

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : vehicles.length === 0 ? (
                <div className="text-center">No vehicles found.</div>
            ) : (
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Category</th>
                            <th className="p-3 text-left">Type</th>
                            <th className="p-3 text-left">Seats</th>
                            <th className="p-3 text-left">Location</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Number Plate</th>
                            <th className="p-3 text-left">Description</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((vehicle) => (
                            <tr key={vehicle._id} className="border-b">
                                <td className="p-3">{vehicle.name}</td>
                                <td className="p-3">{vehicle.category}</td>
                                <td className="p-3">{vehicle.types}</td>
                                <td className="p-3">{vehicle.seat}</td>
                                <td className="p-3">{vehicle.location}</td>
                                <td className="p-3">${vehicle.price}</td>
                                <td className="p-3">{vehicle.numberPlate}</td>
                                <td className="p-3">{vehicle.description}</td>
                                <td className="p-3 flex gap-2">
                                    <button
                                        onClick={() => handleEdit(vehicle)}
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(vehicle._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Edit Modal */}
            {editingVehicle && (
                <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-[60%]">
                        <h2 className="text-xl font-semibold mb-4">Edit Vehicle</h2>
                        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Category *</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Type *</label>
                                <input
                                    type="text"
                                    name="types"
                                    value={formData.types || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Seats *</label>
                                <input
                                    type="number"
                                    name="seat"
                                    value={formData.seat || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Location *</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Price *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Number Plate *</label>
                                <input
                                    type="text"
                                    name="numberPlate"
                                    value={formData.numberPlate || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Description *</label>
                                <textarea
                                    name="description"
                                    value={formData.description || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                />
                            </div>
                            <div className="col-span-2 space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Vehicle Image (Optional)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300"
                                />
                            </div>
                            <div className="col-span-2 flex gap-4 mt-4">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingVehicle(null)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserVehicles;