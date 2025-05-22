import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    organization: null, 
};

const organizationSlice = createSlice({
    name: 'organization',
    initialState,
    reducers: {
        setOrganizationDetails: (state, action) => {
            state.organization = action.payload; 
        },
    },
});

export const selectOrganization = (state) => state.organization.organization;

export const { setOrganizationDetails } = organizationSlice.actions;

export default organizationSlice.reducer;
