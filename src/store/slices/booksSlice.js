import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
    name: 'book',
    initialState: 0,
    reducers: {
        update(state, action) {
            return action.payload;
        },
        add(state, action) {
            return state + 1;
        },
        subtract(state, action) {
            if(state !== 0 ) {
                return state -1;
            }
            return state;
        }
    }
})

export const bookReducer = booksSlice.reducer;
export const { update, add, subtract } = booksSlice.actions;