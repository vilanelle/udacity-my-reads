import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class Search extends React.Component {
    state = {
        query: '',
        booksFound: [],
        prompt: ''
    }

    // update state as user inputs query
    handleChange = (e) => {
        this.setState({ query: e.target.value })
    }
    // handle submit of book search form
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.query) {
            this.setState({ prompt: "" });
            BooksAPI.search(this.state.query)
                .then(res => {
                    // handle empty API response
                    if (!res.error) {
                        this.setState({ booksFound: res })
                    } else {
                        this.setState({ prompt: "No matches found (try: 'Artificial Intelligence', 'Shakespeare'...)" });
                    }
                });
        } else {
            // prompt for search input if input null
            this.setState({ prompt: "Please enter search term" });
        }
    }

    // update book list
    handleOnChange = (e) => {
        const shelf = e.target.value;
        if(shelf === 'none') {
            return;
        }
        const bookId = e.target.dataset.key;
        const bookToAdd = this.state.booksFound.find(b => b.id === bookId);
        this.props.addBook(bookToAdd, shelf);
    }

    getActiveShelfClass = (shelf, value) => {
        return shelf === value ? 'selected' : '';
    }
    
    getActiveSelectOption = (id) => {
        const { books } = this.props;
        const shelves = Object.keys(this.props.books);
        let currShelf = 'none';
        shelves.map(shelf => {
            books[shelf].map(book => {
             if (id === book.id) {
                 currShelf = shelf;
             }   
            });
        });
        
        return currShelf;
    }

    getSelect = (book) => {
        const currShelf = this.getActiveSelectOption(book.id);
        return (
            <select
                data-key={book.id}
                onChange={this.handleOnChange}
                defaultValue={currShelf}>
                <option value="none" disabled>Add to app...</option>
                <option value="currentlyReading" className={this.getActiveShelfClass(currShelf, "currentlyReading")}> Currently Reading</option>
                <option value="wantToRead" className={this.getActiveShelfClass(currShelf, "wantToRead")}> Want to Read</option>
                <option value="read" className={this.getActiveShelfClass(currShelf, "read")}>Read</option>
                <option value="none">None</option>
            </select>
        )
    }
    
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
      NOTES: The search from BooksAPI is limited to a particular set of search terms.
      You can find these search terms here:
      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
      you don't find a specific author or title. Every search is limited by search terms.
    */}
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleChange} />
                        </form>
                    </div>
                </div>
                {this.state.prompt && <h2>{this.state.prompt}</h2>}
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.booksFound.map((book, i) => {
                            return (
                                <li key={i}>
                                    <div className="book" >
                                        <div className="book-top">
                                            <div onClick={this.handleBookClick}  data-key={i}  className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks && book.imageLinks.thumbnail && book.imageLinks.thumbnail}")` }}></div>
                                                <div className="book-shelf-changer">
                                                {this.getSelect(book)}
                                              </div>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title && book.title}</div>
                                    <div className="book-authors">{book.authors && book.authors.map((author, i) => {
                                        return (
                                            <span key={i}>{author}</span>
                                        )
                                    })}</div>
                                </li>
                            )
                        })
                        }
                    </ol>
                </div>
            </div>

        )
    }

}

export default Search