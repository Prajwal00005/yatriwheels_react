import React, { useEffect, useState } from "react";
import axios from "axios";

import VehicleCard from "./VehicleCard";

interface Vehicle {
  _id: string;
  name: string;
  description: string;
  category: string;
  types: string;
  price: number;
  seat: number;
  location: string;
  numberPlate: string;
  createdBy: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const fetchVehicle = async () => {
    try {
      const token = localStorage.getItem('token'); // Make sure token exists!
      const response = await axios.get('http://localhost:3000/api/v1/vehicles', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setVehicles(response.data.data);
      }
    } catch (error: any) {
      console.error("Error fetching vehicles:", error.response?.data || error.message);
    }
  };


  useEffect(() => {
    fetchVehicle();
  }, []); // 👈 dependency array prevents infinite loop

  console.log(vehicles)

  return (
    <div className="flex flex-wrap w-full gap-2">
      {vehicles.map((car) => (
        <VehicleCard key={car._id} vehicle={car} />
      ))}

    </div>
  );
};

export default Vehicles;
