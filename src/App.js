import React, { Component } from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BooksList from "./BooksList";
import Search from "./Search";

class BooksApp extends Component {
  storage;

  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  };

  componentDidMount() {
    this.storage = window.localStorage ? window.localStorage : null;
    // if book list not cached get it from api
    if (!this.storage.books) {
      BooksAPI.getAll().then(books => {
        let allBooks = {};
        allBooks.currentlyReading = books.filter(
          book => book.shelf === "currentlyReading"
        );
        allBooks.wantToRead = books.filter(book => book.shelf === "wantToRead");
        allBooks.read = books.filter(book => book.shelf === "read");
        this.storage.setItem('books', JSON.stringify(allBooks));
        const initialState = JSON.parse(this.storage.getItem("books"));
        this.setState({ books: initialState });
      });
    } else {
      const initialState = JSON.parse(this.storage.getItem("books"));
      this.setState({ books: initialState });
    }
  }

  updateStateAndStorage = books => {
    this.setState({ books: books });
    this.storage.setItem('books', JSON.stringify(books));
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

  updateBookListFromSearchView = (book, shelf) => {
    const { books } = this.state;
    const bookOnList = this.getBookFromList(book.id);
    // remove book from current shelf, if applicable
    if (bookOnList) {
      books[bookOnList.shelf] = books[bookOnList.shelf].filter(
        b => b.id !== bookOnList.id
      );
    }
    // if new shelf selected add book to new shelf
    if (shelf !== 'none') {
      book.shelf = shelf;
      books[shelf].push(book);
    }
    this.updateStateAndStorage(books)
  };

  updateBookList = (newShelf, id) => {
    const { books } = this.state;
    const bookToUpdate = this.getBookFromList(id);
    // remove book from current shelf
    books[bookToUpdate.shelf] = books[bookToUpdate.shelf].filter(
      b => b.id !== id
    );
    // if new shelf selected add book to new shelf
    if (newShelf !== 'none') {
      bookToUpdate.shelf = newShelf;
      books[newShelf].push(bookToUpdate);
    }
    this.updateStateAndStorage(books)
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
              this.state.books && 
              <BooksList
                books={this.state.books}
                updateBookList={this.updateBookList}
              />
            )}
          />
          <Route
            exact
            path="/search"
            render={() => (
              <Search
                addBook={(book, shelf) => {
                  this.updateBookListFromSearchView(book, shelf);
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
