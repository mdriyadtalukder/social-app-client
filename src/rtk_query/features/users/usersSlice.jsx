import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    search: '',
    title: '',
};
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        getCurrentUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(state.user))
        },
        getSearch: (state, action) => {
            state.search = action.payload;
        },
        getTitle: (state, action) => {
            state.title = action.payload;
        }

    }
})
export default usersSlice.reducer;
export const { getCurrentUser, getSearch,getTitle } = usersSlice.actions;