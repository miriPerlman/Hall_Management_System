import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import workerReducer from "./workerSlice"
import dishReducer from "./dishSlice"


const store = configureStore({
    reducer: {
        users: userReducer,
        workers:workerReducer,
        dishes: dishReducer
    }
});

export default store;