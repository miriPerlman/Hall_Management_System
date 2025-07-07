import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../Api";


export const getAllCustomers = createAsyncThunk(
    'products/fetchData',
    async () => {
        const response = await fetch('http://localhost:5263/api/customers');
        const data = await response.json();
        return data;  
    }
);
export const getCustomerById = createAsyncThunk(
    'u/fetchData',
    async (_, { getState }) => {
        const state = getState();
        const response = await fetch(`http://localhost:5263/api/customers/${state.user.id}`);
        const data = await response.json();
        console.log(data);
        return data;  
        
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

        if (!response.ok) {
            console.log('Response:', response);
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message || 'Network response was not ok'}`);
        }        

        const data = await response.json();
        return data;  
    }
);
export const getByIdAsyncAction = createAsyncThunk(
    'customers/getById',
    async (id) => { 
        const response = await fetch(`http://localhost:5263/api/Authorizations/${id}`);
        if (!response.ok) {
            console.log('Response:', response);
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message || 'Network response was not ok'}`);
        }
        const data = await response.json();
        return data;  
    }
);
export const getNextInvitations=createAsyncThunk(
    'workers/getInvitations',
    async()=>{
        const response=await fetch(`http://localhost:5263/api/invitations/showWeeksOrders`);
        if(!response.ok){
            console.log('Response:', response);
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message || 'Network response was not ok'}`);
        }
        const data = await response.json();
        return data.$values;  
    }
);
export const getInvitationsInNextMonth = createAsyncThunk(
    'invitations/getInvitations',
    async ({ month, year }) => {
        const response = await fetch(`http://localhost:5263/api/invitations/${month}/${year}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message || 'Network response was not ok'}`);
        }
        const data = await response.json();
        return data.$values;
    }
);
export const getDetailsOfDate = createAsyncThunk(
    'invitations/getDetailsOfDate',
    async (date) => {
        const response = await fetch(`http://localhost:5263/api/invitations/getDetailsOfDate/${date}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message || 'Network response was not ok'}`);
        }
        const data = await response.json();
        return data;
    }
);
export const getWorkerById = createAsyncThunk(
  'workers/getWorkerById',
  async (id) => {
    const response = await fetch(`http://localhost:5263/api/Worker/${id}`);
    if (!response.ok) throw new Error('Failed to fetch worker');
    return await response.json();
  }
);
export const getAllWorkers= createAsyncThunk(
    'workers/getAllWorkers',
    async () => {
        const response = await fetch('http://localhost:5263/api/worker');
        if (!response.ok) {
            console.log('Response:', response);
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message || 'Network response was not ok'}`);
        }
        const data = await response.json();
        return data.$values;  
    }
)

export const deleteWorkerById= createAsyncThunk(
    'workers/deleteWorkerById',
    async (id) => {
        const response = await fetch(`http://localhost:5263/api/worker/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            console.log('Response:', response);
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message || 'Network response was not ok'}`);
        }
        return id;  
    }
);

export const addNewWorker=createAsyncThunk(
    'workers/addWorker',
    async (workerData) => {
        const response = await fetch('http://localhost:5263/api/worker', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(workerData),
        });
        if (!response.ok) {
            console.log('Response:', response);
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message || 'Network response was not ok'}`);
        }
        const data = await response.json();
        return data;  
    }
);


