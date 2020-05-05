import React from 'react';
import Book from './Book'
import SearchInput from './SearchInput'
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component {
  state = {
    searchResultBooks:[],
   	showSearchScreen: false,
  }

searchBookShelfChangerHandler = (book, shelf) =>{
  //this function allowing user to change books 
  //call this.updateBookShelf
  this.props.updateBookShelf(book,shelf);
  
  //set state add shelf to searchResultBooks list
  this.setState((currentState) => ({
      searchResultBooks : this.manageBookStateHandler(currentState.searchResultBooks,this.props.myBooks)
  }))
}
searchBook=(query)=>{
   console.log("searchBook : "  + query);
   if (query!== '' && query.trim().length > 0 ){
   	this.searchBookAndSetState(query)
   }else {
     this.updateShowSearchScreen(false);
   }
    
  };
searchBookAndSetState = (query) => {
      BooksAPI.search(query,19)
        .then((searchResult) => {
        	if (!searchResult.error) 
            {
              this.updateShowSearchScreen(true);
                this.setState(() => ({
                   searchResultBooks : this.manageBookStateHandler(searchResult,this.props.myBooks)
                }))
            }
        	else
            {
              this.updateShowSearchScreen(false);
            }
      }) 	
 } 
updateShowSearchScreen =(value) =>{
  this.setState(() => ({
    showSearchScreen:value
  }))
}  
manageBookStateHandler = (searchResultBooks, currentShelfBooks)=>{
  	let newBookArray=[];
  	if(typeof searchResultBooks ==='object' && searchResultBooks !==null){
      searchResultBooks.map(book =>{
		
         //object filteredShelfBook
		 let filteredShelfBook =currentShelfBooks.find(shelfBook => shelfBook.id === book.id);
          //if(typeof filteredShelfBook === 'object' && filteredShelfBook !==null && Object.entries(filteredShelfBook).length !== 0)
          if(this.isEmpty(filteredShelfBook))
          {
            newBookArray= newBookArray.concat([book])
          }
          else
          {
            newBookArray= newBookArray.concat([filteredShelfBook])
          }
        return ''
      })
    }//end if
  	//manageSate with book id
	return (newBookArray)
}
isEmpty= (obj)=> {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

  render() {
    const { updateBookShelf, bookShelfNameObject } = this.props; 
    return (
       
	
		<div className="search-books">
			<SearchInput onSearchBook={this.searchBook}/>
            <div className="search-books-results">
			{this.state.showSearchScreen? 
              (
               <ol className="books-grid">
                   {this.state.searchResultBooks? this.state.searchResultBooks.map((searchResultBook) =>(
                      <Book key={searchResultBook.id} book={searchResultBook} bookShelfNameObject={bookShelfNameObject} updateBookShelf={this.searchBookShelfChangerHandler}/> 
                    )) : ''}
                </ol>
			   ):
			   (
				<div>There is nothing to show base on the search input</div>
               )
			}
            </div>
         </div>
    )
  }
}      
SearchBooks.propTypes = {
  myBooks: PropTypes.array.isRequired,
  bookShelfNameObject: PropTypes.object.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
};
export default SearchBooks