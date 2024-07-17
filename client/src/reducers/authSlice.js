import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    token: null,
};

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLoginData: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
        },
        logoutUser: state => {
            state.isLoggedIn = false;
            state.token = null;
        },
    },
});

export const { setUserLoginData, logoutUser } = authSlice.actions;

export default authSlice.reducer;
