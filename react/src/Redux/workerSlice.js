import { createSlice } from "@reduxjs/toolkit";
import { deleteWorkerById, getAllWorkers, getNextInvitations ,getWorkerById} from "./thunk";

const workerSlice = createSlice({
    name: 'worker',
    initialState: {
        worker: null,
        invitations: [],
        workersList:[]
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
            })
            .addCase(getWorkerById.fulfilled, (state, action) => {
                state.worker = action.payload;
            })
             .addCase(getWorkerById.pending, (state) => {
                 state.worker = [];
            })
            .addCase(getWorkerById.rejected, (state) => {
                state.worker = [];
            })
            .addCase(getAllWorkers.fulfilled, (state, action) => {
                state.workersList = action.payload;
            })
             .addCase(getAllWorkers.pending, (state) => {
                 state.workersList = [];
            })
            .addCase(getAllWorkers.rejected, (state) => {
                state.workersList = [];
            })
            .addCase(deleteWorkerById.fulfilled, (state, action) => {
                const id=action.payload;
                state.workersList = state.workersList.filter(worker => worker.id !== id);
            })
    },
});

export default workerSlice.reducer;
