import React from 'react';
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types';


class ListBooks extends React.Component {
  
  filterMyBooksByShelf =(myBooks,shelfName)=>{
    //console.log("filterMyBooksByShelf JSON.stringify: " + JSON.stringify(myBooks))
    //check if book array is array ? do filter by shelfName ELSE pass empty array
	return Array.isArray(myBooks) && myBooks.length ? myBooks.filter((b) => (
          b.shelf.toLowerCase() === shelfName.toLowerCase())) : [];
  };

  render() {
    const { bookShelfNameObject, updateBookShelf} = this.props;
    return (
		<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
      
             {Object.entries(bookShelfNameObject).map(([key,value])=>{
                return (
                  key!=="none"?
                    <div key={key}>
                      <BookShelf shelfName={key} 
                                 books={this.filterMyBooksByShelf(this.props.myBooks, key)} 
								 updateBookShelf={updateBookShelf} 
								 bookShelfNameObject={bookShelfNameObject}
					  />
                    </div>
                  :""				
                )
              })}

            </div>

            <Link
              className="open-search"
              to='/Search'>
                Add a book
            </Link>
		</div>
    )
  }
}      
ListBooks.propTypes = {
  myBooks: PropTypes.array.isRequired,
  bookShelfNameObject: PropTypes.object.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
};
export default ListBooks