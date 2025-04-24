import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import userSchema from "../schema/RegisterSchema";
import registerUserData from "../services/Register_Services";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AxiosError } from "axios";

// Type inference from Zod schema
type UserSchemaField = z.infer<typeof userSchema>;

interface RegisterDialog {
  onCancel: () => void;
}

const UserRegistration: React.FC<RegisterDialog> = ({ onCancel }) => {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<UserSchemaField>({
    resolver: zodResolver(userSchema),
  });

  const nav = useNavigate();

  const handleFormSubmit = async (data: UserSchemaField) => {
    try {
      const user = await registerUserData({ data });
      if (user.roles.includes("USER")) {
        nav("/home");
        toast.success("Registration successful!");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ field?: string; message?: string }>;
      const errorMessage = axiosError.response?.data?.message || "Failed to register user. Please try again.";

      // Handle field-specific errors from backend
      if (axiosError.response?.data?.field) {
        setError(axiosError.response.data.field as keyof UserSchemaField, {
          message: errorMessage,
        });
      }

      toast.error(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="h-full w-full md:h-[80%] md:w-1/2 rounded-lg bg-white shadow-2xl overflow-hidden">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full p-6"
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
        >
          <h1 className="col-span-full font-bold text-primary text-xl tracking-wider my-4 text-center">
            Please fill in the user registration form
          </h1>

          {/* Full Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 mb-1">Full Name *</label>
            <input
              id="name"
              className="border-b border-gray-400 p-2 focus:outline-none text-gray-700"
              {...register("name")}
              type="text"
              placeholder="Enter Full Name"
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 mb-1">Email Address *</label>
            <input
              id="email"
              className="border-b border-gray-400 p-2 focus:outline-none text-gray-700"
              {...register("email")}
              type="email"
              placeholder="Enter Email Address"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-700 mb-1">Phone Number *</label>
            <input
              id="phone"
              className="border-b border-gray-400 p-2 focus:outline-none text-gray-700"
              {...register("phone")}
              type="tel"
              placeholder="Enter Phone Number"
              aria-invalid={errors.phone ? "true" : "false"}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm mt-1">{errors.phone.message}</span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700 mb-1">Password *</label>
            <input
              id="password"
              className="border-b border-gray-400 p-2 focus:outline-none text-gray-700"
              {...register("password")}
              type="password"
              placeholder="Password"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-gray-700 mb-1">Confirm Password *</label>
            <input
              id="confirmPassword"
              className="border-b border-gray-400 p-2 focus:outline-none text-gray-700"
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</span>
            )}
          </div>

          {/* State */}
          <div className="flex flex-col">
            <label htmlFor="state" className="text-gray-700 mb-1">State *</label>
            <input
              id="state"
              className="border-b border-gray-400 p-2 focus:outline-none text-gray-700"
              {...register("state")}
              type="text"
              placeholder="Enter State"
              aria-invalid={errors.state ? "true" : "false"}
            />
            {errors.state && (
              <span className="text-red-500 text-sm mt-1">{errors.state.message}</span>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="text-gray-700 mb-1">Address *</label>
            <input
              id="address"
              className="border-b border-gray-400 p-2 focus:outline-none text-gray-700"
              {...register("address")}
              type="text"
              placeholder="Enter Address"
              aria-invalid={errors.address ? "true" : "false"}
            />
            {errors.address && (
              <span className="text-red-500 text-sm mt-1">{errors.address.message}</span>
            )}
          </div>

          {/* File input for Image */}
          <div className="flex flex-col col-span-full">
            <label htmlFor="image" className="text-gray-700 mb-1">Profile Picture</label>
            <input
              id="image"
              className="border-b border-gray-400 p-2 focus:outline-none text-gray-700"
              {...register("image")} // Changed from "picture" to "image" to match service
              type="file"
              accept="image/*"
              aria-invalid={errors.image ? "true" : "false"}
            />
            {errors.image && (
              <span className="text-red-500 text-sm mt-1">{errors.image.message}</span>
            )}
          </div>

          {/* Buttons */}
          <div className="col-span-full flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <button
              className="px-4 py-2 bg-primary text-white rounded-lg text-xl hover:bg-primary-dark transition disabled:opacity-50"
              type="submit"
              disabled={isSubmitting}
              aria-label="Submit registration form"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <button
              className="px-4 py-2 bg-white border border-secondary text-primary rounded-lg text-xl hover:bg-gray-50 transition"
              type="button"
              onClick={onCancel}
              aria-label="Cancel registration"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default UserRegistration;