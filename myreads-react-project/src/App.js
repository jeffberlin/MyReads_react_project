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

  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }
    
  render() {

    // const { books, shelf } = this.props

    const currentlyReading = this.state.books.filter(book => book.shelf === "currentlyReading")
    const wantToRead = this.state.books.filter(book => book.shelf === "wantToRead")
    const read = this.state.books.filter(book => book.shelf === "read")

    return (

      <div className="list-books">
        
        <Route exact path="/" render={() => (

            <div className="list-books-content">

              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>

              <ListBooks
                bookShelf="Currently Reading"
                books={currentlyReading.sort(sortBy("title"))}
              />

              <ListBooks
                bookShelf="Want to Read"
                books={wantToRead.sort(sortBy("title"))}
              />

              <ListBooks
                bookShelf="Read"
                books={read.sort(sortBy("title"))}
              />

              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
              
          </div>
        )}/>

        <Route path="/search" render={() => (
          <Search
            books={this.state.books}
            shelf={this.state.shelf}
            onSearchBook={(query) => {
              this.searchBook(query)
            }}
          />
        )}/>

        

      </div>
        
    )
  }
}

export default BooksApp
