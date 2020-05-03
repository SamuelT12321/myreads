import React from 'react';
import Book from './Book'
import PropTypes from 'prop-types';

//[ "currentlyReading", "wantToRead" , "read"]
class BooksShelf extends React.Component {
  
GetBookShelfTitleByShelfName = (shelfName) => {
  const filteredKeyName = Object.keys(this.props.bookShelfNameObject).filter((key) => (
          key.toLowerCase() === shelfName.toLowerCase()))
  return this.props.bookShelfNameObject[filteredKeyName];
};

  render() {
    const {books, shelfName,updateBookShelf, bookShelfNameObject} = this.props; 
    return (
			<div className="bookshelf">
                <h2 className="bookshelf-title">{this.GetBookShelfTitleByShelfName(shelfName)}</h2>
                <div className="bookshelf-books">
                 <ol className="books-grid">
				
  				  {books.map((book) =>(
                    <Book key={book.id} book={book} bookShelfNameObject={bookShelfNameObject} updateBookShelf={updateBookShelf}/> 
                  ))}
                 </ol>
                </div>
             </div>
    )
  }
}   
BooksShelf.propTypes = {
  books: PropTypes.array.isRequired,
  bookShelfNameObject: PropTypes.object.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
};

export default BooksShelf