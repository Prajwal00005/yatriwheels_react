import { z } from "zod";
import { LoginSchema } from "../schema/LoginSchema";
import axios from "axios";
import { LoginResponse, User } from "../types/Login_type";


export async function  loginUser(data: z.infer<typeof LoginSchema>):Promise<User>{
    const response = await axios.post<LoginResponse>(`http://localhost:3000/api/v1/auth/login`, data);

    localStorage.setItem("token", response.data.token);
    return response.data.data;
}

