import { useState } from 'react';
import useBooksContext from '../hooks/use-books-context';
import { store } from "../store";
import { editBookById } from '../store';
import { useThunk } from '../hooks/useThunk';

function BookEdit({ book, onSubmit }) {
  const [title, setTitle] = useState(book.title);

  const [editById, isLoading, error] = useThunk(editBookById);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
    editById({id: book.id, newTitle: title, newPageCount: 300});

  };

  return (
    <form onSubmit={handleSubmit} className="book-edit">
      <label>Title</label>
      <input className="input" value={title} onChange={handleChange} />
      <button className="button is-primary">Save</button>
    </form>
  );
}

export default BookEdit;
