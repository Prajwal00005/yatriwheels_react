import { z } from "zod";

// Define the schema using Zod
const userSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z
    .string()
    .email("Invalid email")
    .min(3, "Email is required")
    .max(30, "Cannot be more than 30 characters"),
  phone: z
    .string()
    .min(10, "Phone number is required")
    .max(15, "Phone number cannot be more than 15 characters"),
  password: z
    .string()
    .min(6, "Password should be at least 6 characters")
    .max(15, "Password cannot be more than 15 characters"),
  confirmPassword: z
    .string()
    .min(6, "Password confirmation should be at least 6 characters")
    .max(15, "Password confirmation cannot be more than 15 characters"),
  state: z.string().min(1, "State is required"),
  address: z.string().min(1, "Address is required"),
  image: z.instanceof(FileList).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password and Confirm Password do not match",
  path: ["confirmPassword"],
});


export default userSchema;