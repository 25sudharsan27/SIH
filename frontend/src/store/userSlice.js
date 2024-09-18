import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null, // This will store the complete user data
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.user = action.payload; // Set the complete user data
        },
        // Optionally add other reducers if needed
    },
});

// Selectors
export const selectUser = (state) => state.user.user;

// Actions
export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
