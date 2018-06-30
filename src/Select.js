import React, { Component } from 'react';

class Select extends Component {
    
  getActiveShelfClass = (shelf, value) => {
    return shelf === value ? "selected" : "";
  };

    render() {
        const { book } = this.props;
        return (
          <select
            data-key={book.id}
            data-shelf={book.shelf}
            onChange={this.props.handleOnChange}
            defaultValue={book.shelf}
          >
            <option value="none" disabled>
              Move to...
            </option>
            <option
              value="currentlyReading"
              className={this.getActiveShelfClass(book.shelf, "currentlyReading")}
            >
              Currently Reading
            </option>
            <option
              value="wantToRead"
              className={this.getActiveShelfClass(book.shelf, "wantToRead")}
            >
              Want to Read
            </option>
            <option
              value="read"
              className={this.getActiveShelfClass(book.shelf, "read")}
            >
              Read
            </option>
            <option value="none">None</option>
          </select>
        );
      };
}

export default Select;