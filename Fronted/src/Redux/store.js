import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import workerReducer from "./workerSlice"


const store = configureStore({
    reducer: {
        users: userReducer,
        workers:workerReducer
    }
});

export default store;