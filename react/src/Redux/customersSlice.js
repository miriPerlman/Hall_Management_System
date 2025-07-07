import { createSlice } from '@reduxjs/toolkit';
import { fetchDataAsyncAction } from './thunk';
// import { fetchDataAsyncAction } from './thunk';




const ProductsSlice = createSlice({
    name: "products",
    initialState: {
        productsList: [],
        loading: false,
    
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataAsyncAction.pending, (state) => {
                state.loading = true;
                state.productsList = [];
            
            })
            .addCase(fetchDataAsyncAction.fulfilled, (state, action) => {
                state.productsList = action.payload;
                state.loading = false;
             
            })
            .addCase(fetchDataAsyncAction.rejected, (state) => {
                state.loading = false;
           
            });  
    }
});


export const { actions, reducer } = ProductsSlice;
export default reducer;