import { z } from "zod";


export const LoginSchema = z.object({
    email:z.string().email("Invalid email address").min(2,"Email is required"),
    password:z.string().min(6,"Must be 6 character length")
});


