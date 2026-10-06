import BookShow from './BookShow';

import { store } from "../store";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { update } from '../store';

function BookList() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.booksApi);
  
  const renderedBooks = data.map((book) => {
    return <BookShow key={book.id} book={book} />;
  });

  return <div className="book-list">{renderedBooks}</div>;
}

export default BookList;
