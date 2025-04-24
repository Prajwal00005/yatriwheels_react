import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";

// Define the Zod schema for vehicle form
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

// Service function to call the API
const createVehicle = async ({ data }: { data: TVehicleSchema }): Promise<string> => {
    const formData = new FormData();

    // Set formData fields
    formData.set("name", data.name);
    formData.set("category", data.category);
    formData.set("types", data.types);
    formData.set("seat", data.seat.toString());
    formData.set("location", data.location);
    formData.set("price", data.price.toString());
    formData.set("numberPlate", data.numberPlate);
    formData.set("description", data.description);

    // Conditionally set image field
    if (data.image) {
        formData.set("image", data.image);
    }

    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Authorization token not found in local storage");
    }

    try {
        const response = await axios.post("http://localhost:3000/api/v1/create", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.message as string;
    } catch (error: any) {
        console.error("Error creating vehicle:", error);
        if (error.response?.status === 401) {
            throw new Error("User not authenticated. Please log in again.");
        }
        throw new Error(error.response?.data?.message || "Failed to create vehicle");
    }
};

const CreateVehicleForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm<TVehicleSchema>({
        resolver: zodResolver(VehicleSchema),
        defaultValues: {
            name: "CretA",
            category: "Comfortable",
            types: "Petrol",
            seat: 5,
            location: "KTM",
            price: 20,
            numberPlate: "125A",
            description: "Hello this is test",
        },
    });

    const onSubmit = async (data: TVehicleSchema) => {
        try {
            const res = await createVehicle({ data });
            toast.success(res);
            reset();
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    return (
        <div className="min-h-[75vh] py-4 px-4 flex items-center justify-center p-4 ml-16 md:ml-64">
            <div className="w-full max-w-4xl bg-white rounded-xl overflow-hidden">
                <div className="p-2">
                    <div className="text-center mb-4">
                        <h1 className="text-xl font-bold text-gray-800">Vehicle Registration</h1>
                        <p className="text-gray-600 text-sm">Please fill out the form below to register your vehicle</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Name *</label>
                            <input
                                type="text"
                                {...register("name")}
                                className={`w-full px-3 py-1.5 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300"
                                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm`}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name.message}</p>}
                        </div>

                        {/* Category */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Category *</label>
                            <input
                                type="text"
                                {...register("category")}
                                className={`w-full px-3 py-1.5 rounded-lg border ${errors.category ? "border-red-500" : "border-gray-300"
                                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm`}
                            />
                            {errors.category && (
                                <p className="text-red-500 text-xs mt-0.5">{errors.category.message}</p>
                            )}
                        </div>

                        {/* Type */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Type *</label>
                            <input
                                type="text"
                                {...register("types")}
                                className={`w-full px-3 py-1.5 rounded-lg border ${errors.types ? "border-red-500" : "border-gray-300"
                                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm`}
                            />
                            {errors.types && <p className="text-red-500 text-xs mt-0.5">{errors.types.message}</p>}
                        </div>

                        {/* Seats */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Seats *</label>
                            <input
                                type="number"
                                {...register("seat", { valueAsNumber: true })}
                                className={`w-full px-3 py-1.5 rounded-lg border ${errors.seat ? "border-red-500" : "border-gray-300"
                                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm`}
                            />
                            {errors.seat && <p className="text-red-500 text-xs mt-0.5">{errors.seat.message}</p>}
                        </div>

                        {/* Location */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Location *</label>
                            <input
                                type="text"
                                {...register("location")}
                                className={`w-full px-3 py-1.5 rounded-lg border ${errors.location ? "border-red-500" : "border-gray-300"
                                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm`}
                            />
                            {errors.location && (
                                <p className="text-red-500 text-xs mt-0.5">{errors.location.message}</p>
                            )}
                        </div>

                        {/* Price */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Price *</label>
                            <input
                                type="number"
                                {...register("price", { valueAsNumber: true })}
                                className={`w-full px-3 py-1.5 rounded-lg border ${errors.price ? "border-red-500" : "border-gray-300"
                                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm`}
                            />
                            {errors.price && <p className="text-red-500 text-xs mt-0.5">{errors.price.message}</p>}
                        </div>

                        {/* Number Plate */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Number Plate *</label>
                            <input
                                type="text"
                                {...register("numberPlate")}
                                className={`w-full px-3 py-1.5 rounded-lg border ${errors.numberPlate ? "border-red-500" : "border-gray-300"
                                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm`}
                            />
                            {errors.numberPlate && (
                                <p className="text-red-500 text-xs mt-0.5">{errors.numberPlate.message}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Description *</label>
                            <textarea
                                {...register("description")}
                                className={`w-full px-3 py-1.5 rounded-lg border ${errors.description ? "border-red-500" : "border-gray-300"
                                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm`}
                                rows={3}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-xs mt-0.5">{errors.description.message}</p>
                            )}
                        </div>

                        {/* File Upload */}
                        <div className="col-span-2 space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Vehicle Image (Optional)</label>
                            <div
                                className={`flex items-center justify-center w-full border ${errors.image ? "border-red-500" : "border-gray-300"
                                    } border-dashed rounded-lg p-3 text-sm`}
                            >
                                <div className="text-center">
                                    <svg
                                        className="mx-auto h-8 w-8 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <p className="mt-1 text-xs text-gray-600">Upload a file or drag and drop</p>
                                    <input
                                        type="file"
                                        id="image"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            setValue("image", file || undefined);
                                        }}
                                    />
                                    <label
                                        htmlFor="image"
                                        className="mt-1 inline-flex items-center px-2.5 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500 cursor-pointer"
                                    >
                                        Select File
                                    </label>
                                </div>
                            </div>
                            {errors.image && <p className="text-red-500 text-xs mt-0.5">{errors.image.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="col-span-2 mt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm text-sm ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                    }`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    "Register Vehicle"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateVehicleForm;