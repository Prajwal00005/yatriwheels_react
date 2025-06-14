import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Vehicle } from './pages/Homepage/components/Vehicles'
import { vehicleFetch } from "./pages/adminDashboard/API/UserAPi";

interface TestState {
    count: number;
    loading?: boolean;
    data: Vehicle[];

}

const initialState: TestState = {
    count: 5,
    loading: false,
    data: [],
}


const testSlice = createSlice({
    initialState,
    name: "test",
    reducers: {
        increaseCounter(state) {
            state.count++;
        },

        decreaseCounter(state) {
            state.count--;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(testThunk.pending, (state,) => {
            state.loading = true;
        });

        builder.addCase(testThunk.fulfilled, (state, action) => {
            state.loading = false;

            state.data = action.payload;
            console.log(action.payload)
        });

        builder.addCase(testThunk.rejected, (state, action) => {
            state.loading = false;
            console.log(action.payload)
        });
    }
});

export const testThunk = createAsyncThunk<Vehicle[], void, { rejectValue: object }>(
    "test/initialFetch",
    async (_, { rejectWithValue }) => {
        try {
            return await vehicleFetch()
        } catch (error) {
            return rejectWithValue(error as object);
        }
    }
);

export const { increaseCounter, decreaseCounter } = testSlice.actions


export default testSlice.reducer;

