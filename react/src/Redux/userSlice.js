import { createSlice } from '@reduxjs/toolkit';
import { getCustomerById , getByIdAsyncAction} from './thunk';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        customer: null,
        id: null
    },
    reducers: {
        insertId:(state, action) => {
            state.id = action.payload;
            console.log("insertId action payload:", action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCustomerById.fulfilled, (state, action) => {
                state.customer = action.payload; 
            })
            .addCase(getCustomerById.pending, (state) => {
                state.customer = null;
            })
            .addCase(getCustomerById.rejected, (state) => {
                state.customer = null;
            })
            .addCase(getByIdAsyncAction.fulfilled, (state, action) => {
                state.customer = action.payload;
                state.id = action.payload.id; // Assuming the payload has an 'id' field
            })
            .addCase(getByIdAsyncAction.pending, (state) => {
                state.id = null;
            })
            .addCase(getByIdAsyncAction.rejected, (state) => {
                state.id = null;
            });
    }
});

export const { insertId } = userSlice.actions;
export default userSlice.reducer;
