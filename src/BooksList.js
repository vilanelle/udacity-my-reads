import React from 'react';
import { Link } from 'react-router-dom';

class BooksList extends React.Component {
    handleOnChange = (e) => {
        const currShelf = e.target.dataset.shelf;
        const newShelf = e.target.value;
        if (newShelf === 'none') {
            return;
        }
        const index = e.target.dataset.key;
        this.props.updateBookList(currShelf, newShelf, index);
        console.log(index)
    }

    render() {
        const { books } = this.props;
        return (
            <div className="list-books-content">
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books.currentlyReading.map((book, index) => {
                                console.log('fs', index);
                                return (
                                    <li key={index}>
                                        <div className="book" >
                                            <div className="book-top">
                                                <div className="book-cover" style={{
                                                    width: 128,
                                                    height: 193,
                                                    backgroundImage: `url("${book.imageLinks.thumbnail}")`
                                                }}></div>
                                                <div className="book-shelf-changer">
                                                    <select
                                                        data-key={index}
                                                        data-shelf={'currentlyReading'}
                                                        onChange={this.handleOnChange}>
                                                        <option value="none" disabled>Move to...</option>
                                                        <option value="currentlyReading">Currently Reading</option>
                                                        <option value="wantToRead">Want to Read</option>
                                                        <option value="read">Read</option>
                                                        <option value="none">None</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{book.title}</div>
                                            <div className="book-authors">{book.authors.map((author, i) => {
                                                return (
                                                    <span key={i}>{author}</span>
                                                )
                                            })}</div>
                                        </div>
                                    </li>
                                )
                            })}

                        </ol>
                    </div>
                </div>

                <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books.wantToRead.map((book, index) => {
                                return (
                                    <li key={index}>
                                        <div className="book" >
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select
                                                        data-key={index}
                                                        data-shelf={"wantToRead"}
                                                        onChange={this.handleOnChange}>
                                                        <option value="none" disabled>Move to...</option>
                                                        <option value="currentlyReading">Currently Reading</option>
                                                        <option value="wantToRead">Want to Read</option>
                                                        <option value="read">Read</option>
                                                        <option value="none">None</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{book.title}</div>
                                            <div className="book-authors">{book.authors.map((author, i) => {
                                                return (
                                                    <span key={i}>{author}</span>
                                                )
                                            })}</div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ol>
                    </div>
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books.read.map((book, index) => {
                                return (
                                    <li key={index}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                                <div className="book-shelf-changer">
                                                <select 
                                                data-key={index} 
                                                data-shelf={'read'} 
                                                onChange={this.handleOnChange}>
                                                        <option value="none" disabled>Move to...</option>
                                                        <option value="currentlyReading">Currently Reading</option>
                                                        <option value="wantToRead">Want to Read</option>
                                                        <option value="read">Read</option>
                                                        <option value="none">None</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{book.title}</div>
                                            <div className="book-authors">{book.authors.map((author, i) => {
                                                return (
                                                    <span key={i}>{author}</span>
                                                )
                                            })}</div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ol>
                    </div>
                </div>
                <Link to='/search' className="open-search"><p>+</p></Link>
            </div>
        )
    }
}

export default BooksList