import React, { Component } from 'react';

class Select extends Component {
    
  getActiveShelfClass = (shelf, value) => {
    return shelf === value ? "selected" : "";
  };

    render() {
        const { book } = this.props;
        const shelf = book.shelf ? book.shelf : (this.props.getActiveSelectOption ? this.props.getActiveSelectOption(book) : 'none');
        return (
          <select
            data-key={book.id}
            data-shelf={shelf}
            onChange={this.props.handleOnChange}
            defaultValue={shelf}
          >
            <option value="none" disabled>
              Move to...
            </option>
            <option
              value="currentlyReading"
              className={this.getActiveShelfClass(shelf, "currentlyReading")}
            >
              Currently Reading
            </option>
            <option
              value="wantToRead"
              className={this.getActiveShelfClass(shelf, "wantToRead")}
            >
              Want to Read
            </option>
            <option
              value="read"
              className={this.getActiveShelfClass(shelf, "read")}
            >
              Read
            </option>
            <option 
              value="none"
              className={this.getActiveShelfClass(shelf, "none")}
            >None</option>
          </select>
        );
      };
}

export default Select;