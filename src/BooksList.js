import React from 'react';
import { Link } from 'react-router-dom';

class BooksList extends React.Component {
    
    shelfNames = {
        currentlyReading: 'Currently Reading',
        wantToRead: 'Want to Read',
        read: 'Read'
    }
    
    handleOnChange = (e) => {
        const currShelf = e.target.dataset.shelf;
        const newShelf = e.target.value;
        const index = e.target.dataset.key;

        if (newShelf === 'none') {
            return;
        }

        this.props.updateBookList(currShelf, newShelf, index);
    }

    getActiveShelfClass = (shelf, value) => {
        return shelf === value ? 'selected' : '';
    }

    getSelect = (book, index) => {
        return (
            <select
                data-key={index}
                data-shelf={book.shelf}
                onChange={this.handleOnChange}
                value={book.shelf}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading" className={this.getActiveShelfClass(book.shelf, "currentlyReading")}> Currently Reading</option>
                <option value="wantToRead" className={this.getActiveShelfClass(book.shelf, "wantToRead")}> Want to Read</option>
                <option value="read" className={this.getActiveShelfClass(book.shelf, "read")}>Read</option>
                <option value="none">None</option>
            </select>
        )
    }

    getBookDetails = (book, index) => {
        return (
            <li key={index}>
                <div className="book" >
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url("${book.imageLinks && book.imageLinks.thumbnail && book.imageLinks.thumbnail}")`
                        }}></div>
                        <div className="book-shelf-changer">
                            {this.getSelect(book, index)}
                        </div>
                    </div>
                    <div className="book-title">{book.title && book.title}</div>
                    <div className="book-authors">{book.authors && book.authors.map((author, i) => {
                        return (
                            <span key={i}>{author}</span>
                        )
                    })}</div>
                </div>
            </li>
        )
    }
    
    getBookShelf = (shelf, shelfName) => {
        return (
            <div className="bookshelf" key={shelfName}>
                <h2 className="bookshelf-title">{this.shelfNames[shelfName]}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {shelf.map((book, index) => {
                            return this.getBookDetails(book, index);
                        })}

                    </ol>
                </div>
            </div>
        )
    }

    render() {
        const { books } = this.props;
        return (
            <div className="list-books-content">
                {Object.keys(books).map((key) => {
                    return this.getBookShelf(books[key], key);
                })}
                <Link to='/search' className="open-search"><p>+</p></Link>
            </div>
        )
    }
}

export default BooksList