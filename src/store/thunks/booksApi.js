import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const fetchAllBooks = createAsyncThunk('books/fetch', async () => {
  const response = await axios.get('https://j111jp9ai3.execute-api.us-east-2.amazonaws.com/dev/books');

  console.log("from fetchAllBooks");

  console.log(response.data.items);

  return response.data.items;
});

const editBookById = createAsyncThunk('books/edit', async ({id, newTitle, newPageCount}) => {
    const response = await axios.put(`https://j111jp9ai3.execute-api.us-east-2.amazonaws.com/dev/books/${id}`, {
      id,
      title: newTitle,
      page_count: newPageCount
    });
    return response.data.updatedItem;
});

const deleteBookById = createAsyncThunk('books/delete', async (id) => {
    await axios.delete(`https://j111jp9ai3.execute-api.us-east-2.amazonaws.com/dev/books/${id}`);
    return id; 
});

  const createBook = createAsyncThunk('books/create', async ({id, title, page_count}) => {
    const response = await axios.post('https://j111jp9ai3.execute-api.us-east-2.amazonaws.com/dev/books', {
      id,
      title,
      page_count
    });
    return response.data.newItem;
  });   

export { fetchAllBooks, editBookById, deleteBookById, createBook };