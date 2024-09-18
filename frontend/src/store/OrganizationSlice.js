import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    organization: null, // This will store the complete organization data
};

const organizationSlice = createSlice({
    name: 'organization',
    initialState,
    reducers: {
        setOrganizationDetails: (state, action) => {
            state.organization = action.payload; // Set the complete organization data
        },
        // Optionally add other reducers if needed
    },
});

// Selectors
export const selectOrganization = (state) => state.organization.organization;

// Actions
export const { setOrganizationDetails } = organizationSlice.actions;

export default organizationSlice.reducer;
