import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Select from './Select';

class Search extends Component {
  state = {
    query: "",
    prompt: "",
    booksFound: []
  };

  // return search results on user input
  handleChange = e => {
    const query = e.target.value;
    this.setState({ query: query });
    if (query) {
      this.setState({ booksFound: [] });
      this.setState({ prompt: "" });
      BooksAPI.search(query).then(res => {
   // handle empty API response
        if (!res.error) {
          this.setState({ booksFound: res });
        } else {
          this.setState({
            prompt:
              "No matches found (try: 'Artificial Intelligence', 'Shakespeare'...)"
          });
        }
      });
    } else {
   // prompt for search input if input null
      this.setState({ prompt: "Please enter search term" });
      this.setState({ booksFound: [] });
    }
  };
  // disable submit of book search form
  handleSubmit = e => {
    e.preventDefault();
  };

  // update book list
  handleOnChange = e => {
    const shelf = e.target.value;
    const bookId = e.target.dataset.key;
    const bookToAdd = this.state.booksFound.find(b => b.id === bookId);
    this.props.addBook(bookToAdd, shelf);
  };
  
  getActiveSelectOption = book => {
    const { books } = this.props;
    const shelves = Object.keys(this.props.books);
    let currShelf = "none";
    shelves.map(shelf => {
      books[shelf].map(b => {
        if (book.id === b.id) {
          currShelf = shelf;
        }
        return null;
      });
      return null;
    });

    return currShelf;
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
      NOTES: The search from BooksAPI is limited to a particular set of search terms.
      You can find these search terms here:
      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
      you don't find a specific author or title. Every search is limited by search terms.
    */}
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={this.handleChange}
              />
            </form>
          </div>
        </div>
        {this.state.prompt && <h2>{this.state.prompt}</h2>}
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.booksFound.map((book, i) => {
              return (
                <li key={i}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        onClick={this.handleBookClick}
                        data-key={i}
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
                        <Select
                         book={book}
                         handleOnChange={this.handleOnChange}
                         getActiveSelectOption={this.getActiveSelectOption}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="book-title">{book.title && book.title}</div>
                  <div className="book-authors">
                    {book.authors &&
                      book.authors.map((author, i) => {
                        return <span key={i}>{author}</span>;
                      })}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
