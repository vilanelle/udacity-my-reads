import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SHELFNAMES }  from "./Constants";
import Select from './Select';

class BooksList extends Component {

  handleOnChange = e => {
    const newShelf = e.target.value;
    const id = e.target.dataset.key;
    this.props.updateBookList(newShelf, id);
  };

  // getActiveShelfClass = (shelf, value) => {
  //   return shelf === value ? "selected" : "";
  // };

  // getSelect = book => {
  //   return (
  //     <select
  //       data-key={book.id}
  //       data-shelf={book.shelf}
  //       onChange={this.handleOnChange}
  //       value={book.shelf}
  //     >
  //       <option value="none" disabled>
  //         Move to...
  //       </option>
  //       <option
  //         value="currentlyReading"
  //         className={this.getActiveShelfClass(book.shelf, "currentlyReading")}
  //       >
  //         Currently Reading
  //       </option>
  //       <option
  //         value="wantToRead"
  //         className={this.getActiveShelfClass(book.shelf, "wantToRead")}
  //       >
  //         Want to Read
  //       </option>
  //       <option
  //         value="read"
  //         className={this.getActiveShelfClass(book.shelf, "read")}
  //       >
  //         Read
  //       </option>
  //       <option value="none">None</option>
  //     </select>
  //   );
  // };

  getBookDetails = book => {
    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${book.imageLinks &&
                  book.imageLinks.thumbnail &&
                  book.imageLinks.thumbnail}")`
              }}
            />
            <div className="book-shelf-changer">
            {/* {this.getSelect(book)} */}
            <Select 
            book={book}
            handleOnChange={this.handleOnChange}
            />
            </div>
          </div>
          <div className="book-title">{book.title && book.title}</div>
          <div className="book-authors">
            {book.authors &&
              book.authors.map((author, i) => {
                return <span key={i}>{author}</span>;
              })}
          </div>
        </div>
      </li>
    );
  };

  getBookShelf = (shelf, shelfName) => {
    return (
      <div className="bookshelf" key={shelfName}>
        <h2 className="bookshelf-title">{SHELFNAMES[shelfName]}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelf.map(book => {
              return this.getBookDetails(book);
            })}
          </ol>
        </div>
      </div>
    );
  };

  getBookList = books => {
    return Object.keys(books).map(key => {
      return this.getBookShelf(books[key], key);
    });
  };

  render() {
    const { books } = this.props;
    return (
      <div className="list-books-content">
        {books && this.getBookList(books)}
        <Link to="/search" className="open-search">
          <p>+</p>
        </Link>
      </div>
    );
  }
}

export default BooksList;
