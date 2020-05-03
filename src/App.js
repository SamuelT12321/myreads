import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import { Route } from 'react-router-dom'


const bookShelfObject = {
	currentlyReading : 'Currenly Reading',
    wantToRead : 'Want to Read',
    read : 'Read',
  	none : 'None',
}

class BooksApp extends React.Component {
  state = {
    myBooks:[],
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((myBooks) => {
        this.setState(() => ({
          myBooks
        }))
      })
  };

  //loop every object 
  updateBookShelf = (book, shelf) =>{
    BooksAPI.update(book,shelf)
    	.then((book)=>{
		  BooksAPI.getAll()
            .then((myBooks) => {
              this.setState(() => ({
                myBooks
              }))
            })
    			//this.setState((currentState)=>({}))
      })
  }

  render() {
    return (
      <div className="app">
       	  <Route exact path='/' render={() => (
            <ListBooks
              myBooks={this.state.myBooks}
			  bookShelfNameObject={bookShelfObject}
              updateBookShelf={this.updateBookShelf}
            />
          )} />
          
          <Route exact path='/Search' render={({ history }) => (
            <SearchBooks
              myBooks={this.state.myBooks}
			  bookShelfNameObject={bookShelfObject}
			  updateBookShelf={(book, shelf) => {
              	this.updateBookShelf(book, shelf)
              	history.push('/')
            }}
            />
          )} />
      </div>
    )
  }
}

export default BooksApp
