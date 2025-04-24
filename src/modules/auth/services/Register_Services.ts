import { z } from "zod";
import userSchema from "../schema/RegisterSchema";
import axios from "axios";
import { User } from "../types/Login_type";

const registerUserData = async ({ data }: { data: z.infer<typeof userSchema> }): Promise<User> => {
    console.log(data);
    const formData = new FormData();
    formData.set("name", data.name);
    formData.set("email", data.email);
    formData.set("phone", data.phone);
    formData.set("password", data.password);
    formData.set("confirmPassword", data.confirmPassword);
    formData.set("state", data.state);
    formData.set("address", data.address);

    if (data.image && data.image[0]) {
        formData.set("image", data.image[0]);
    }

    console.log(formData);
    try {
        const response = await axios.post("http://localhost:3000/api/v1/auth/register", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        localStorage.setItem("token", response.data.token);
        return response.data.data;
    } catch (error) {
        console.error("Error during user registration:", error);
        throw new Error("Failed to register user. Please try again.");
    }
};

export default registerUserData;