import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./slice"
import vehicleSlice from "./pages/Homepage/components/slice/homepage_slice"

/// dfdf
const store = configureStore({
    reducer: {
        test: testSlice,
        vehicleStore: vehicleSlice

    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;