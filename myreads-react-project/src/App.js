import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import sortBy from 'sort-by'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'
import Search from './Search'
import './App.css'


class BooksApp extends Component {

  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  render() {

    const { books, shelf, updateBookStatus, changeShelf } = this.props;
    const { query } = this.state;

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

              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>

          </div>
        )}/>

        <Route path="/search" render={({ history }) => (

          <Search
            books={this.state.books}
            updateQuery={this.showingBooks}
            changeShelf={this.changeShelf}
          />
        )}/>

      </div>
        
    )
  }
}

export default BooksApp
