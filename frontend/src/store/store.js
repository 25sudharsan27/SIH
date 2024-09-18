import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import organizationReducer from './OrganizationSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        organization: organizationReducer,
    },
});

export  {store};
