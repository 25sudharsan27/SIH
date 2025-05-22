import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null, 
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.user = action.payload; 
        },
    },
});

export const selectUser = (state) => state.user.user;

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
