import { createSlice } from "@reduxjs/toolkit";
import { deleteWorkerById, getAllWorkers, getNextInvitations, getWorkerById } from "./thunk";

const workerSlice = createSlice({
    name: 'worker',
    initialState: {
        worker: null,
        invitations: [],
        workersList: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNextInvitations.fulfilled, (state, action) => {
                state.invitations = action.payload; 
            })
            .addCase(getNextInvitations.pending, (state) => {
                state.invitations = [];
            })
            .addCase(getNextInvitations.rejected, (state) => {
                state.invitations = [];
                console.error('Error fetching invitations:', action.error.message);
            })
            .addCase(getWorkerById.fulfilled, (state, action) => {
                state.worker = action.payload;
            })
            .addCase(getWorkerById.pending, (state) => {
                state.worker = null; 
            })
            .addCase(getWorkerById.rejected, (state,action) => {
                state.worker = null; 
                console.error('Error fetching worker:', action.error.message);
            })
            .addCase(getAllWorkers.fulfilled, (state, action) => {
                state.workersList = action.payload;
            })
            .addCase(getAllWorkers.pending, (state) => {
                state.workersList = [];
            })
            .addCase(getAllWorkers.rejected, (state) => {
                state.workersList = [];
                console.error('Error fetching workers list:', action.error.message);
            })
            .addCase(deleteWorkerById.fulfilled, (state, action) => {
                const id = action.payload;
                state.workersList = state.workersList.filter(worker => worker.id !== id);
            });
    },
});

export default workerSlice.reducer;
