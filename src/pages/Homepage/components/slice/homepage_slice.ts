import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HomepageInitialState, Vehicle } from "../types/homepage";
import axios from "axios";
import { BASE_URL } from "../../../../const/constants";
import { RootState } from "../../../../store";

// Thunk
export const fetchVehicle = createAsyncThunk<
    Vehicle[],
    void,
    { rejectValue: { message: string } }
>('vehicle/getvehicle', async (_, { rejectWithValue, getState }) => {
    try {
        const state = getState() as RootState;
        const { searchValue, selectedCategpryId, minPrice, maxPrice } = state.vehicleStore;

        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Authentication token missing");
        }

        const params = new URLSearchParams();

        // Handle search term
        if (searchValue) {
            params.set("name", searchValue);
        }

        // Handle selected categories
        if (selectedCategpryId && selectedCategpryId.length > 0) {
            selectedCategpryId.forEach((e, index) => {
                params.set(`categorys[${index}]`, e);
            });
        }

        // Handle price range
        if (minPrice !== null) {
            params.set("minPrice", minPrice.toString());
        }
        if (maxPrice !== null) {
            params.set("maxPrice", maxPrice.toString());
        }

        console.log("🚀 Redux State Before API Call:", { searchValue, selectedCategpryId, minPrice, maxPrice });
        console.log("🚀 Request Params:", params.toString());
        const fullUrl = `${BASE_URL}/vehicles?${params.toString()}`;
        console.log("🚀 Full API URL:", fullUrl);
        console.log("🚀 Token:", token ? "Present" : "Missing");

        const response = await axios.get(`${BASE_URL}/vehicles`, {
            params,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("🚀 API Response Data:", response.data);
        console.log("🚀 Response Status:", response.status);
        return response.data.data;
    } catch (e: any) {
        const errorMessage = e.response?.data?.message || e.message || "Failed to fetch vehicles";
        console.log("🚀 API Error:", errorMessage);
        console.log("🚀 Error Details:", e.response?.data || e);
        return rejectWithValue({ message: errorMessage });
    }
});

// Initial state
const initialState: HomepageInitialState = {
    data: [],
    loading: false,
    error: null,
    searchValue: "",
    selectedCategpryId: [],
    minPrice: null,
    maxPrice: null,
};

// Slice
const vehicleSlice = createSlice({
    name: "vehicle",
    initialState,
    reducers: {
        setSearchTerm(state, action: PayloadAction<{ searchTerm: string | undefined }>) {
            state.searchValue = action.payload.searchTerm || "";
        },
        addCategory(state, action: PayloadAction<{ category: string }>) {
            state.selectedCategpryId.push(action.payload.category);
        },
        removeCategory(state, action: PayloadAction<{ category: string }>) {
            const id = state.selectedCategpryId.findIndex((value) => value === action.payload.category);
            if (id !== -1) {
                state.selectedCategpryId.splice(id, 1);
            }
        },
        setPriceRange(state, action: PayloadAction<{ minPrice: number | null; maxPrice: number | null }>) {
            state.minPrice = action.payload.minPrice;
            state.maxPrice = action.payload.maxPrice;
            console.log("🚀 Price Range Updated in Redux:", { minPrice: state.minPrice, maxPrice: state.maxPrice });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVehicle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVehicle.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchVehicle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export reducer
export default vehicleSlice.reducer;

export const { setSearchTerm, addCategory, removeCategory, setPriceRange } = vehicleSlice.actions;