import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ToastContainer, toast } from 'react-toastify';
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/login_service";
import { LoginSchema } from "../schema/LoginSchema";

interface LoginDialogProps {
  onCancel: () => void; // Function that takes no arguments and returns nothing
}

type loginfield = z.infer<typeof LoginSchema>

const LoginDialog: React.FC<LoginDialogProps> = ({ onCancel }) => {

  const nav = useNavigate();

  const { handleSubmit, formState: { errors }, register } = useForm<loginfield>({
    resolver: zodResolver(LoginSchema),
  });

  const [loggingIn, setLoggingIn] = useState(false);
  // const [emailError, setEmailError] =  useState<string|undefined>(undefined);
  // const [passwordError, setPasswordError] =  useState<string|undefined>(undefined);

  const formSubmit = async (data: loginfield) => {
    if (loggingIn) return;
    try {
      setLoggingIn(true)
      const user = await loginUser(data);
      if (user.roles.includes("ADMIN")) {
        nav("/admin/dashboard")

      } else if (user.roles.includes("MERCHANT")) {
        // alert()
        nav("/merchant/dashboard")
      } else {
        nav("/home")
      }
    } catch (error) {
      if (error instanceof AxiosError) {

        toast.error(`${error.response?.data?.message || error.message}`);
      } else {
        // Handle non-Axios errors
        toast.error("An unexpected error occurred.");
      }

    } finally {
      setLoggingIn(false)
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-200 backdrop-blur-sm flex justify-center items-center z-5000">
      <div className="flex h-full w-full md:h-2/3 md:w-2/5 rounded-lg bg-white shadow-xl overflow-hidden">
        {/* Left side - Image */}
        <div className="hidden md:block md:w-1/2 h-full flex-1">
          <img
            className="h-full w-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5dwbhgg6pyPpHsVrEs5yqaEI08lb1JsY_Wg&s"
            alt="Login background"
          />
        </div>

        {/* Right side - Login Form */}
        <div className="flex-1 w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-center text-primary">Log In</h2>

          <form className="space-y-4 py-4" onSubmit={handleSubmit(formSubmit)}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200"
              >
                {loggingIn ? "Please wait" : "Login"}
              </button>

              <button
                type="button"
                onClick={onCancel}
                className="w-full py-2 px-4 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-100 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Sign Up Prompt */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginDialog;