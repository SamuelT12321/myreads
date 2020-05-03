import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';


class SearchInput extends React.Component {
  render() {
    return (
            <div className="search-books-bar">
      		  <Link
                className="close-search"
                to='/'>
                  Close
              </Link>

              <div className="search-books-input-wrapper">
                <input type="text" 
      				   placeholder="Search by title or author"
      				   onChange={(event) => this.props.onSearchBook(event.target.value)}
  				/>
              </div>
         
            </div>
    )
  }
}
SearchInput.propTypes = {
  onSearchBook: PropTypes.func.isRequired,
};

export default SearchInput