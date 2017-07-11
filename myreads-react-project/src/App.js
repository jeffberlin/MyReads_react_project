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
      this.setState({ books: books })
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
      BooksAPI.update(book, shelf).then((res) => { this.setState(state => ({ books: state.books.filter(b => b.id !== book.id).concat([ book ]) }))}
      )}
    }
  }

  searchBooks = (query) => {
    if (query !== '') {
      BooksAPI.search(query, 10).then(result => (
        result.map(book => this.setState(prevState => {
          booksArray : prevState.booksArray.push({ title : book.title, authors : book.authors, thumbnail : book.imageLinks.thumbnail, shelf : book.shelf, id : book.id})
        }))
      ))
    } else {
      this.setState({
        booksArray : []
      })
    }
  }
    
  render() {

    const { books, shelf } = this.props

    return (
      <div className="app">

        <Route exact path="/" render={() => (
        <ListBooks
          books={this.state.books}
          shelf={this.state.shelf}
          onUpdateBookStatus={(book, shelf) => { this.updateBookStatus(book, shelf)}} />
        )}/>

        <Route path="/search" render={({ history }) => (
          <BookSearch
            books={this.state.books}
            shelf={this.state.books}
            onSearchBooks={( query ) => {
              this.searchBooks(query)
            }}
            onUpdateBookStatus={(book, shelf) => { this.updateBookStatus(book,shelf)}} />
        )} />
      </div>
            
    )
  }
}

export default BooksApp
