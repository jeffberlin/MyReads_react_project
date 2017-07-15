import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import './App.css'
import sortBy from 'sort-by'
import Search from './Search'

class BooksApp extends Component {

  state = {
    books: []

    //showSearchPage: true
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }
  
    
  render() {

    const { books, shelf } = this.props

    const currentlyReading = this.state.books.filter(book => book.shelf === "currentlyReading")
    const wantToRead = this.state.books.filter(book => book.shelf === "wantToRead")
    const read = this.state.books.filter(book => book.shelf === "read")

    return (
      <div className="App">

        <div className="list-books">

          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          
          <Route exact path="/" render={() => (
            <div className="list-books-content">

              <ListBooks
                bookShelf="Currently Reading"
                books={currentlyReading.sort(sortBy("title"))}
                changeShelf={this.changeShelf}
              />

              <ListBooks
                bookShelf="Want to Read"
                books={wantToRead.sort(sortBy("title"))}
                changeShelf={this.changeShelf}
              />

              <ListBooks
                bookShelf="Read"
                books={read.sort(sortBy("title"))}
                changeShelf={this.changeShelf}
              />

            </div>
          )}/>
        </div>

        <div className="open-search">
            <Link to="/search">Add a book</Link>
        </div>
 
      </div>

    )
  }
}

export default BooksApp
