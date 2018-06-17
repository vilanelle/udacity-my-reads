import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
// components
import BooksList from './BooksList';
import Search from './Search';

// TODO 
// - fix book moving (index disappears when book with smaller index moved first)
// - persist state
// - select dropdown should show book shelf
// - search functionality should show books with select

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

  addBook = (b) => {
    b.shelf = 'wantToRead';
    this.state.books.wantToRead.push(b);
    this.setState(state => ({
      books: {
        currentlyReading: this.state.books.currentlyReading,
        wantToRead: this.state.books.wantToRead,
        read: this.state.books.read
      }
    }))
  }

  updateBooks = (currShelf, newShelf, index) => {
    const updatedBook = {...this.state.books[currShelf][index]};
    updatedBook.shelf = newShelf;
    let newState = {...this.state};
    newState.books[newShelf].push(updatedBook); 
    newState.books[currShelf] = newState.books[currShelf].filter((el, i) => i !== Number(index));
    this.setState(newState)
    console.log(this.state)
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
          <Route exact path='/search' render={({ history }) => (
            <Search addBook={(b) => {
              this.addBook(b);
              history.push('/');
            }
            } />
          )} />

        </div>
      </div>
    )
  }
}

export default BooksApp
