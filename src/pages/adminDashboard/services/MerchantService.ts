import { z } from "zod";
import Companyschema from "../schema/MerchantSchema";
import axios from "axios";

const createMerchant = async ({ data }: { data: z.infer<typeof Companyschema> }): Promise<string> => {
  const formData = new FormData();

  // Set formData fields
  formData.set("name", data.name);
  formData.set("email", data.email);
  formData.set("phone", data.phone);
  formData.set("city", data.city);
  formData.set("country", data.country);
  formData.set("Address", data.address);
  formData.set("password", data.password);
  formData.set("confirmPassword", data.confirmPassword);

  // Conditionally set picture field
  if (data.image && data.image[0]) {
    const imge = data.image[0];
    console.log(imge)
    formData.append("image", imge);
  }

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authorization token not found in local storage");
  }

  try {
    console.log(formData.values())
    const response = await axios.post("http://localhost:3000/api/v1/merchant", formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Use template literals for cleaner code
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.message as string;
  } catch (error: any) {
    console.error("Error creating merchant:", error);
    throw new Error(error.response?.data?.message || "Failed to create merchant");
  }
};

export default createMerchant;