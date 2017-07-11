import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    Shelf: ''
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    //showSearchPage: true
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBookStatus = (book, shelf) => {
    this.setState({ shelf: shelf })
    if (shelf) {
      BooksAPI.update(book, shelf).then(books => this.setState({ books: books })).catch(function(e){
        console.log('error',e)
      });

    if (book.shelf !== shelf) {
      book.shelf = shelf
      BooksAPI.update(book, shelf).then((res) => { this.setState(state => ({ books: state.books.filter(b => b.id !== book.id).concat([ book ])
      }))})
    }
    }
  }

  searchBooks = (query) => {
    this.setState({ query: query })
    if (query.trim() !== '') {
      BooksAPI.search(query).then(
        res => { if (res && res.length) { this.setState({ books: res })
      }
    }
  ).catch(function(e) {
    console.log('error',e)
  })
}
}
    
  render() {

    const { books, onUpdateShelves } = this.props

    return (
      <div className="app">

        <Route exact path="/" render={() => (
        <ListBooks
          books={this.state.books}
          shelf={this.state.shelf}
          onUpdateShelves={(book, shelf) => { this.updateBookStatus(book, shelf)}} />
        )}/>

        <Route path="/search" render= {({ history }) => (
          <BookSearch
            books={this.state.books}
            shelf={this.state.books}
            onSearchBooks={( query ) => {
              this.searchBooks(query)
            }}
            onUpdateBooksStatus = {( book, shelf ) => { this.updateBookStatus(book,shelf)}} />
        )} />
      </div>
            
    )
  }
}

export default BooksApp
