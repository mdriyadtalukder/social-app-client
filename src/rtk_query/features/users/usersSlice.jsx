import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null
};
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        getCurrentUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(state.user))
        }

    }
})
export default usersSlice.reducer;
export const { getCurrentUser } = usersSlice.actions;