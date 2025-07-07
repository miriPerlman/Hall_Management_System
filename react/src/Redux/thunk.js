import { createAsyncThunk } from "@reduxjs/toolkit";


export const getAllCustomers = createAsyncThunk(
    'customers/fetchAllCustomers',
    async () => {
        const response = await fetch('http://localhost:5263/api/customers');
        return await handleError(response);
    }
);

export const getCustomerById = createAsyncThunk(
    'customers/fetchCustomerById',
    async (_, { getState }) => {
        const state = getState();
        const response = await fetch(`http://localhost:5263/api/customers/${state.user.id}`);
        return await handleError(response);
    }
);

export const createNewCustomerAsyncAction = createAsyncThunk(
    'customers/createNewCustomer',
    async (customerData) => {
        const response = await fetch('http://localhost:5263/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerData),
        });
        return await handleError(response);
    }
);

export const getByIdAsyncAction = createAsyncThunk(
    'customers/getById',
    async (id) => {
        const response = await fetch(`http://localhost:5263/api/Authorizations/${id}`);
        return await handleError(response);
    }
);

export const getNextInvitations = createAsyncThunk(
    'workers/getNextInvitations',
    async () => {
        const response = await fetch('http://localhost:5263/api/invitations/showWeeksOrders');
        const data = await handleError(response);
        return data.$values;
    }
);

export const getInvitationsInNextMonth = createAsyncThunk(
    'invitations/getInvitationsInNextMonth',
    async ({ month, year }) => {
        const response = await fetch(`http://localhost:5263/api/invitations/${month}/${year}`);
        const data = await handleError(response);
        return data.$values;
    }
);

export const getDetailsOfDate = createAsyncThunk(
    'invitations/getDetailsOfDate',
    async (date) => {
        const response = await fetch(`http://localhost:5263/api/invitations/getDetailsOfDate/${date}`);
        return await handleError(response);
    }
);

// הגדרת הפונקציה
const handleError = (response) => {
  if (!response.ok) {
    throw new Error(`Failed to fetch worker. Status: ${response.status}`);
  }
  return response.json();
};


export const getWorkerById = createAsyncThunk(
  'workers/getWorkerById',
  async (id) => {
    const response = await fetch(`http://localhost:5263/api/Worker/${id}`);
    return await handleError(response);  // שימוש ב-`handleError`
  }
);


export const getAllWorkers = createAsyncThunk(
    'workers/getAllWorkers',
    async () => {
        const response = await fetch('http://localhost:5263/api/worker');
        const data = await handleError(response);
        return data.$values;
    }
);

export const deleteWorkerById = createAsyncThunk(
    'workers/deleteWorkerById',
    async (id) => {
        const response = await fetch(`http://localhost:5263/api/worker/${id}`, {
            method: 'DELETE',
        });
       
        return await handleError(response);
    }
);

export const addNewWorker = createAsyncThunk(
    'workers/addNewWorker',
    async (workerData) => {
        const response = await fetch('http://localhost:5263/api/worker', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(workerData),
        });
        return await handleError(response);
    }
);
