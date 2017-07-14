import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import BookSearch from './BookSearch'
import './App.css'
import sortBy from 'sort-by'

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

      <div className="list-books">

        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        
        <div className="list-books-content">

          <Route exact path="/" render={() => (

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

          )}/>

        </div>

        <Route path="/search" render={({ history }) => (
          <BookSearch
            books={this.state.books}
            shelf={this.state.books}
          />
        )}/>
      </div>

    )
  }
}

export default BooksApp
