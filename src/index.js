import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from "./store";
import { Provider as BooksProvider } from './context/books';
import { Provider as ReduxProvider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ReduxProvider store={store}>
    <BooksProvider>
      <App />
    </BooksProvider>
  </ReduxProvider>
);
