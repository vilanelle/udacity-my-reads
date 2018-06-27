import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
// components
import BooksList from "./BooksList";
import Search from "./Search";

// TODO
// - persist state

class BooksApp extends React.Component {
  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      let allBooks = {};
      allBooks.currentlyReading = books.filter(
        book => book.shelf === "currentlyReading"
      );
      allBooks.wantToRead = books.filter(book => book.shelf === "wantToRead");
      allBooks.read = books.filter(book => book.shelf === "read");
      this.setState(state => ({
        books: allBooks
      }));
    });
  }

  getBookFromList = id => {
    const { books } = this.state;
    let book = null;
    Object.keys(books).map(key => {
      books[key].map(b => {
        if (b.id === id) {
          book = b;
        }
        return null;
      });
      return null;
    });
    return book;
  };

  addBook = (book, shelf) => {
    const { books } = this.state;
    const bookOnList = this.getBookFromList(book.id);
    if (bookOnList) {
      books[bookOnList.shelf] = books[bookOnList.shelf].filter(
        b => b.id !== bookOnList.id
      );
    }
    book.shelf = shelf;
    books[shelf].push(book);
    this.setState(state => ({ books }));
  };

  updateBooks = (newShelf, id) => {
    const { books } = this.state;
    const bookToUpdate = this.getBookFromList(id);
    books[bookToUpdate.shelf] = books[bookToUpdate.shelf].filter(
      b => b.id !== id
    );
    bookToUpdate.shelf = newShelf;
    books[newShelf].push(bookToUpdate);
    this.setState(state => ({ books }));
  };

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Route
            exact
            path="/"
            render={() => (
              <BooksList
                books={this.state.books}
                updateBookList={this.updateBooks}
              />
            )}
          />
          <Route
            exact
            path="/search"
            render={() => (
              <Search
                addBook={(book, shelf) => {
                  this.addBook(book, shelf);
                }}
                books={this.state.books}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default BooksApp;
