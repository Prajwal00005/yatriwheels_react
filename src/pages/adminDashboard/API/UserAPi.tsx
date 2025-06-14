import axios from 'axios';
import { User } from '../../../modules/auth/types/Login_type';

interface Vehicle {
  _id: string;
  name: string;
  createdBy: { _id: string; name: string };
  types: string;
  price: string;
}

export const userFetch = async (): Promise<User[]> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication token missing. Please log in again.');
  }

  const response = await axios.get('http://localhost:3000/api/v1/users', {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log('userFetch response:', response.data.data);
  return response.data.data || [];
};

export const vehicleFetch = async (): Promise<Vehicle[]> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication token missing. Please log in again.');
  }

  const response = await axios.get('http://localhost:3000/api/v1/vehicles', {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log('vehicleFetch response:', response.data.data);
  return response.data.data || [];
};

export const deleteUser = async (userid: string): Promise<void> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication failed, token missing');
  }

  const response = await axios.delete(`http://localhost:3000/api/v1/deleteUser/${userid}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log('deleteUser response:', response.data);
  // DELETE typically returns no data
};

export const deleteVehicle = async (vehicleId: string): Promise<void> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication token missing');
  }

  const response = await axios.delete(`http://localhost:3000/api/v1/delete/${vehicleId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log('deleteVehicle response:', response.data);
  // DELETE typically returns no data
};

export const updateVehicle = async (vehicleId: string, data: Partial<Vehicle>): Promise<Vehicle> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication token missing');
  }

  const response = await axios.patch(`http://localhost:3000/api/v1/update/${vehicleId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log('updateVehicle response:', response.data);
  return response.data.data || response.data;
};