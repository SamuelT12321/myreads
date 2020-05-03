import React from 'react';
import BookShelfChanger from './BookShelfChanger'
import PropTypes from 'prop-types';

class Book extends React.Component {
  
  render() {
   const { book , bookShelfNameObject,updateBookShelf } = this.props;
   const bookAuthor = this.props.book.authors? 
         				this.props.book.authors.map((author,index) =>
                          <div key={index} className="book-authors">
                                {author}
                          </div>)
    				 : "" ;

    const imageThumbnail = book.imageLinks && book.imageLinks.thumbnail ? 
          					book.imageLinks.thumbnail 
    						: "" ;
    
    return (
            <li>
              <div className="book">
      			<div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageThumbnail})` }}></div>
				   <BookShelfChanger bookShelfNameObject={bookShelfNameObject} book={book} updateBookShelf={updateBookShelf} />
                  </div>
                   <div className="book-title">{book.title}</div>
				   {bookAuthor}            
               </div>
            </li>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  bookShelfNameObject: PropTypes.object.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
};

export default Book