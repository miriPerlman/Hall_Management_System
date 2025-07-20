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
    async (id) => {
        const response = await fetch(`http://localhost:5263/api/customers/${id}`);
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


const handleError = async (response) => {
  if (!response.ok) {
    throw new Error(`Failed to fetch data. Status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data)
  return data;
};


export const getWorkerById = createAsyncThunk(
  'workers/getWorkerById',
  async (id) => {
    const response = await fetch(`http://localhost:5263/api/Worker/${id}`);
    
    return await handleError(response);  
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
export const getFirstDish = createAsyncThunk(
    'dishes/getFirstDish',
    async () => {
        const response = await fetch('http://localhost:5263/api/Dish/getFirstDishDetails');
        return await handleError(response);
    }
);

export const getMainDish = createAsyncThunk(
    "dishes/getMainDish",
     async () => {
            const response = await fetch("http://localhost:5263/api/Dish/getMainDishDetails");
        return await handleError(response);
    }
);

export const getLastDish = createAsyncThunk(
    "dishes/getLastDish",
    async () => {
       
            const response = await fetch("http://localhost:5263/api/Dish/getLastDishDetails");
           return await handleError(response);
    }
);

export const getSalads = createAsyncThunk(
    "dishes/getSalads",
    async () => {
            const response = await fetch("http://localhost:5263/api/Dish/getSaladDetails");
            return await handleError(response);
    }
);

// --- פונקציות ליצירה (שמירה) ---

export const createFirstDish = createAsyncThunk(
    "dishes/createFirstDish",
    async (dishData) => {
        const response = await fetch('http://localhost:5263/api/Dish/createNewFirstDish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dishData),
        });
        return await handleError(response);
    }
);
export const createMainDish = createAsyncThunk(
    "dishes/createMainDish",
    async (dishData) => {
        const response = await fetch('http://localhost:5263/api/Dish/createNewMainDish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dishData),
        });
        return await handleError(response);
    }
);
export const createLastDish = createAsyncThunk(
    "dishes/createLastDish",
    async (dishData) => {
        const response = await fetch('http://localhost:5263/api/Dish/createNewLastDish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dishData),
        });
        return await handleError(response);
    }
);
export const createSalad = createAsyncThunk(
    "dishes/createSalad",
    async (dishData) => {
        const response = await fetch('http://localhost:5263/api/Dish/createNewSalad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dishData),
        });
        return await handleError(response);
    }
);
export const createDish = createAsyncThunk(
    "dishes/createDish",
    async (dishData) => {
        const response = await fetch('http://localhost:5263/api/Dish/createNewDish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dishData),
        });
        return await handleError(response);
    }
);

export const createInvitation = createAsyncThunk(
    "invitation/createInvitation",
    async (invitationData) => {
        const response = await fetch('http://localhost:5263/api/Invitations/CreateNewInvitation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(invitationData),
        });
        return await handleError(response);
    }
);


export const GetAllOrderHistory = createAsyncThunk(
    "dishes/GetAllOrderHistory",
    async (customerId) => {
        const response = await fetch(`http://localhost:5263/api/invitations/${customerId}`);
        const data = await response.json();
        console.log(data); 
        return data.$values || [];
    }
);