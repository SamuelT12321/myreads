import React from 'react';
import PropTypes from 'prop-types';


class BookShelfChanger extends React.Component {
  render() {
  const {bookShelfNameObject, book} = this.props;
        
  const ShelfDropDown = Object.entries(bookShelfNameObject).map(([key,value])=>
        <option key={key} value={key} >{value}</option>
	);

    return (
      <div className="book-shelf-changer">
        <select onChange={(event) => this.props.updateBookShelf(book,event.target.value)}
				value={book.shelf ? book.shelf :'none'}>
          <option disabled>Move to...</option>
		  {ShelfDropDown}
        </select>
      </div>
    )
  }
}      
BookShelfChanger.propTypes = {
  book: PropTypes.object.isRequired,
  bookShelfNameObject: PropTypes.object.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
};
export default BookShelfChanger