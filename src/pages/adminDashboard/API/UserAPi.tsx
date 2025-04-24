import axios from "axios";
import { User } from "../../../modules/auth/types/Login_type";

export const userFetch = async (): Promise<User[]> => {

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication token missing. Please log in again.");
  }
  // console.log(`Token being sent: ${token}`);

  const response = await axios.get("http://localhost:3000/api/v1/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const vehicleFetch = async () => {

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token missing. Please log in again.");
  }

  const response = await axios.get("http://localhost:3000/api/v1/vehicles", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  console.log(response.data.data)

  return response.data.data;

}

export const deleteUser = async (userid: string): Promise<User[]> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication failed, token missing")
  }

  const response = await axios.delete(`http://localhost:3000/api/v1/deleteUser/${userid}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.data

}

export const deleteVehicle = async (vehicleId: string) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("token missing")
    }

    const response = await axios.delete(`http://localhost:3000/api/v1/delete/${vehicleId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response.data.data)
    return response.data.data;
  } catch (e) {
    console.log(e)
  }
}