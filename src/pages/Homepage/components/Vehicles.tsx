import { useEffect } from "react";
// import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import VehicleCard from "./VehicleCard";
// import { Vehicle } from "./types/homepage";
// import { BASE_URL } from "../../../const/constants";
import { AppDispatch, RootState } from "../../../store";
import { fetchVehicle } from "./slice/homepage_slice";

const Vehicles = () => {
  // const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  // const fetchVehicle = async () => {
  //   try {
  //     const token = localStorage.getItem('token'); // Make sure token exists!
  //     const response = await axios.get(`${BASE_URL}/vehicles`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     if (response.status === 200) {
  //       setVehicles(response.data.data);
  //     }
  //   } catch (error: any) {
  //     console.error("Error fetching vehicles:", error.response?.data || error.message);
  //   }
  // };

  const Dispatch = useDispatch<AppDispatch>()

  const { data } = useSelector((state: RootState) => state.vehicleStore);


  useEffect(() => {
    Dispatch(fetchVehicle())
  }, []); // 👈 dependency array prevents infinite loop



  return (
    <div className="flex flex-wrap w-full gap-2 p-10">
      {data.map((car) => (
        <VehicleCard key={car._id} vehicle={car} />
      ))}

    </div>

  );
};

export default Vehicles;
