import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
  state= {
  query: '',
 searchResults: []
  }
  

  updateQuery= (query)=> {
  this.setState({query: query.trim()})
  }

 updateSearchResults=(books)=> {
 this.setState({searchResults: books})}
  
 
  render() {
    const { books }= this.props
    const { query }=this.state

    
    let showingBooks
    let searchedBooks
    if(query) {
   //const match= new RegExp(escapeRegExp(query), 'i')
      searchedBooks= BooksAPI.search(query).then((books)=> {this.setState({searchResults: books})})
console.log(this.state.searchResults)
    //showingBooks= books.filter((book)=> match.test(book.title) || match.test (book.authors))
    } //else {
    //showingBooks= books
    //}
    return(
    <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                   type="text" 
                   placeholder="Search by title or author"
                   value={ query }
                   onChange={(event)=> this.updateQuery(event.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.searchResults.map((book)=> (
                <li
                  key={book.id}
                  className='books-grid-li'
                 >
                   <div className='book'>
                     <div className='book-top'>
                       <div className='book-cover'
                        style={{ width:128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}>
                       </div>
                       <div className='book-shelf-changer'>
                         <select>
                           <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                         </select>
                       </div>
                     </div>
                     <div className='book-title'>{book.title}</div>
                     <div className='book-authors'>{book.authors}</div>
                  </div>                  
                </li>))}
               </ol>
            </div>
          </div>
    )
  }
}
export default ListBooks