import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends Component {

  state = {
    books: []

    //showSearchPage: true
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBookStatus = (book, shelf) => {
    if (shelf) {
      BooksAPI.update(book, shelf).then(books => this.setState({ books: books })).catch(function(e){
        console.log('error',e)
      });

    if (book.shelf !== shelf) {
      book.shelf = shelf
      BooksAPI.update(book, shelf).then((res) => { this.setState(state => ({ books: state.books.filter(b => b.id !== book.id).concat([ book ]) }))}
      )}
    }
  }
  
  changeShelf = (book, newShelf) => {
    const bookId = book.id;
    BooksAPI.update(book, newShelf).then(() => { this.setState(oldState => {
      return {
        books: oldState.books.map(book => {
          if (book.id === bookId) {
            book.shelf = newShelf;
          }
          return book;
        })
      };
    })})
  }
    
  render() {

    const { books, shelf } = this.props

    //const bookShevles = ['none', 'currentlyReading', 'read', 'wantToRead']

    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            shelf={this.state.shelf}
            onUpdateBookStatus={(book, shelf) => {
              this.updateBookStatus(book, shelf)
            }}
          />
        )}/>

        <Route path="/search" render={({ history }) => (
          <BookSearch
            books={this.state.books}
            shelf={this.state.shelf}
            onSearchBook={(query) => {
              this.searchBook(query)
            }}
            updateBookStatus={(book, shelf) => {this.updateBook(book, shelf)}}
          />
        )}/>
      </div>
            
    )
  }
}

export default BooksApp
