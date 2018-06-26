import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
// components
import BooksList from './BooksList';
import Search from './Search';

// TODO 
// NOW DOING - select on search should add book; prevent from adding same book multiple times
// - refactor book shelves management to use id, not index
// - persist state

class BooksApp extends React.Component {
  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      let allBooks = {};
      allBooks.currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
      allBooks.wantToRead = books.filter(book => book.shelf === 'wantToRead');
      allBooks.read = books.filter(book => book.shelf === 'read');
      this.setState(state => ({
        books: allBooks
      }))
    });
  }

  addBook = (book, shelf) => {
    // const { books } = this.state.books;
    // const bookOnList =  this.getBookFromCurrentList(book.id);
    // if (bookOnList) {
    //   if (bookOnList.shelf !== shelf) {
    //     book.shelf = shelf;
    //     this.state.books[shelf].push(book);
    // this.setState(state => ({
    //   books: {
    //     currentlyReading: this.state.books.currentlyReading,
    //     wantToRead: this.state.books.wantToRead,
    //     read: this.state.books.read
    //   }
    // }))
    // return;
    //   } else {
    //     return;
    //   }
    // }
    //refactor - no single source of truth (shelf vs. store)
    book.shelf = shelf;
    // refactor
    this.state.books[shelf].push(book);
    this.setState(state => ({
      books: {
        currentlyReading: this.state.books.currentlyReading,
        wantToRead: this.state.books.wantToRead,
        read: this.state.books.read
      }
    }))
  }

  // getBookFromCurrentList = (id) => {
  //   const { books } = this.state.books;
  //   let book = null;
  //   Object.keys(books).map( key => {
  //     books[key].map( b => {
  //       if (b.id === id) {
  //         book = b;
  //       }
  //     });
  //   })
  //   return book;
  // }

  updateBooks = (currShelf, newShelf, index) => {
    let newState = {...this.state};
    const updatedBook = {...this.state.books[currShelf][index]};
    updatedBook.shelf = newShelf;
    newState.books[newShelf].push(updatedBook); 
    newState.books[currShelf] = newState.books[currShelf].filter((el, i) => i !== Number(index));
    this.setState(state => newState);
  }

 
  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Route exact path='/' render={() => (
            <BooksList 
            books={this.state.books}
            updateBookList={this.updateBooks} />
          )} />
          <Route exact path='/search' render={() => (
            <Search
              addBook={(book, shelf) => {
                this.addBook(book, shelf);
                }}
              books={this.state.books} 
             />
          )} />

        </div>
      </div>
    )
  }
}

export default BooksApp
