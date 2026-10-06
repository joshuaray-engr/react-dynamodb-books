import { configureStore } from "@reduxjs/toolkit";
import { bookReducer } from "./slices/booksSlice";
import { booksApiReducer } from "./slices/booksApiSlice";

 
const store = configureStore({
    reducer: {
        myBooks: bookReducer,
        booksApi: booksApiReducer
    }
});

export { store };
export * from './slices/booksSlice';
export * from './slices/booksApiSlice';
export * from './thunks/booksApi';
