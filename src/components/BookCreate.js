import { useState } from 'react';
import useBooksContext from '../hooks/use-books-context';
import { store } from "../store";
import { createBook } from '../store';
import { useThunk } from '../hooks/useThunk';


function BookCreate() {
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [addBook, isLoading, error] = useThunk(createBook);

  const generateDynamoDbId = () => {
      let result = Math.floor(Math.random() * 9) + 1;
      const array = new Uint32Array(4);
      window.crypto.getRandomValues(array);
      result += array.join('');
  return result.substring(0, 15);
};

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangePageCount = (event) => {
    setPageCount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("clicked on add book submit");
    if(title.length !== 0) {
      addBook({id: Number(generateDynamoDbId()), title: title, page_count: pageCount === '' ? 0 : 0});
    }
    setTitle('');
    setPageCount('');
    setShowAdd(false);
  };

  const handleAddClick = (event) => {
    setShowAdd(true);
  };

  let content = <button className="button" onClick={handleAddClick}>ADD</button> ;
  if (showAdd) {
    content = <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input className="input" value={title} onChange={handleChangeTitle} />
        <label>Page Count</label>
        <input className="input" value={pageCount} onChange={handleChangePageCount} />
        <button className="button">Create!</button>
      </form>;
  }

  return (
    <div className="book-create">
      <h3>Add a Book</h3>
      <div >{content}</div>
    </div>
  ); 
}

export default BookCreate;
