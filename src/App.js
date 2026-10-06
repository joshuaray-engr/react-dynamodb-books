import { useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { store } from "./store";
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';
import BooksContext from './context/books';
import { fetchAllBooks } from './store';
import { useThunk } from './hooks/useThunk';

function App() {
  const [fetchBooks, isLoadingBooks, loadingBooksError] = useThunk(fetchAllBooks);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);
 
  const { data } = useSelector((state) => state.booksApi);

  console.log(data);
  let content;
  if (isLoadingBooks) {
    content = "loading...";
  } else if (loadingBooksError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data.length
  }

  return (
    <div className="app">
      <h1>Reading List {content}</h1>
      <BookList />
      <BookCreate />
    </div>
  );
}

export default App;
