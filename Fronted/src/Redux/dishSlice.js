import { createSlice } from '@reduxjs/toolkit';
import { GetFirstDishSetails } from './thunk';




const DishSlice = createSlice({
    name: "dishes",
    initialState: {
        firstDish: [],
        lastDish: null,
        mainDish: null,
        sald:null,
        loading: false,
    
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetFirstDishSetails.pending, (state) => {
                state.loading = true;
                state.firstDish = [];
            
            })
            .addCase(GetFirstDishSetails.fulfilled, (state, action) => {
                state.firstDish = action.payload;
                state.loading = false;
             
            })
            .addCase(GetFirstDishSetails.rejected, (state) => {
                state.loading = false;
            });  
    }
});


export const { actions, reducer } = DishSlice;
export default reducer;