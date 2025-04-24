import { z } from "zod";

const Companyschema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(8, "Phone number must be at least 8 digits"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  address: z.string().min(1, "Address is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  image: z.instanceof(FileList).optional()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

export default Companyschema;