import { createSlice } from "@reduxjs/toolkit";
import {
    getFirstDish,
    // הוסף את האימפורטים החדשים
    getMainDish,
    getLastDish,
    getSalads,
    createFirstDish,
    // הוסף את האימפורטים החדשים ליצירה
    createMainDish,
    createLastDish,
    createSalad,
    createDish, // ניצור את זה בהמשך
} from "./thunk";
import { act } from "react";

const initialState = {
    // --- First Dish ---
    firstDish: null,
    loadingFirstDish: false,
    errorFirstDish: null,

    // --- הוסף סטייט עבור מנה עיקרית ---
    mainDish: null,
    loadingMainDish: false,
    errorMainDish: null,

    // --- הוסף סטייט עבור מנה אחרונה ---
    lastDish: null,
    loadingLastDish: false,
    errorLastDish: null,

    // --- הוסף סטייט עבור סלטים ---
    salads: null,
    loadingSalads: false,
    errorSalads: null,

    // --- סטייט עבור המנה המורכבת וההזמנה ---
    loadingCreateDish: false,
    errorCreateDish: null,
};

const dishSlice = createSlice({
    name: "dishes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Get First Dish
        builder
            .addCase(getFirstDish.pending, (state) => {
                state.loadingFirstDish = true;
                
                state.errorFirstDish = null;
            })
            .addCase(getFirstDish.fulfilled, (state, action) => {
                state.loadingFirstDish = false;
                console.log(action.payload);
                state.firstDish = action.payload;
            })
            .addCase(getFirstDish.rejected, (state, action) => {
                state.loadingFirstDish = false;
                state.errorFirstDish = action.error.message;
            })

        // =======================================================
        // הוסף את הלוגיקה עבור שאר המנות
        // =======================================================

        // Get Main Dish
        
            .addCase(getMainDish.pending, (state) => {
                state.loadingMainDish = true;
                state.errorMainDish = null;
            })
            .addCase(getMainDish.fulfilled, (state, action) => {
                state.loadingMainDish = false;
                console.log(action.payload);
                state.mainDish = action.payload;
            })
            .addCase(getMainDish.rejected, (state, action) => {
                state.loadingMainDish = false;
                state.errorMainDish = action.error.message;
            })

        // Get Last Dish
        
            .addCase(getLastDish.pending, (state) => {
                state.loadingLastDish = true;
                state.errorLastDish = null;
            })
            .addCase(getLastDish.fulfilled, (state, action) => {
                state.loadingLastDish = false;
                state.lastDish = action.payload;
            })
            .addCase(getLastDish.rejected, (state, action) => {
                state.loadingLastDish = false;
                state.errorLastDish = action.error.message;
            })

        // Get Salads
      
            .addCase(getSalads.pending, (state) => {
                state.loadingSalads = true;
                state.errorSalads = null;
            })
            .addCase(getSalads.fulfilled, (state, action) => {
                state.loadingSalads = false;
                state.salads = action.payload;
            })
            .addCase(getSalads.rejected, (state, action) => {
                state.loadingSalads = false;
                state.errorSalads = action.error.message;
            });
    },
});

export default dishSlice.reducer;