import { createSlice } from "@reduxjs/toolkit";
import { fetchAllBooks, editBookById, deleteBookById, createBook } from "../thunks/booksApi"

const booksApiSlice = createSlice({
  name: 'users',
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(fetchAllBooks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchAllBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(editBookById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(editBookById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.map((book) => {
      if (book.id === action.payload.id) {
        return { ...book, ...action.payload };
      }
      return book;
    })});
    builder.addCase(editBookById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(deleteBookById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBookById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((book) => {
        return book.id !== action.payload;
      });
    });
    builder.addCase(deleteBookById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(createBook.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createBook.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.data.push(action.payload); 
      state.data.unshift(action.payload); 
    });
    builder.addCase(createBook.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const booksApiReducer = booksApiSlice.reducer;