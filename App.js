import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom'
import BookShelf from './BookShelf'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false
  }
componentDidMount() {
 BooksAPI.getAll().then((books)=> {
   this.setState({books})
   console.log(books)
 }) 
}


  render() {
    return (
      <div className="app">
       <Route exact path='/' render={()=> (<BookShelf/>)}/>
       <Route exact path='/addbook' render={()=> (<ListBooks
          books={this.state.books}
         />)}
        />
       
     </div>
    )
  }
}

export default BooksApp
