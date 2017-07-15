import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
//import Search from './Search'

class ListBooks extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired,
		//onUpdateBookStatus: PropTypes.func.isRequired,
		//onSearchBook: PropTypes.func.isRequired,
		//onChangeShelf: PropTypes.func.isRequired
	}

	state = {
		query: ''
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

	render() {
		const { books, shelf, updateBookStatus, searchBook, changeShelf } = this.props

		// let bookShelves
		// if (shelf) {
		// 	const match = new RegExp(escapeRegExp(shelf), 'i')
		// 	bookShelves = this.state.books.filter(book => book.shelf === "wantToRead")
		// 	bookShelves = this.state.books.filter(book => book.shelf === "read")
		// 	bookShelves = this.state.books.filter(book => book.shelf === "currentlyReading")
		// } else {
		// 	bookShelves = books
		// }

		// const wantToRead = this.state.books.filter(book => book.shelf === "wantToRead")
		// const currentlyReading = this.state.books.filter(book => book.shelf === "currentlyReading")
		// const read = this.state.books.filter(book => book.shelf === "read")

		return (

            <div className="bookshelf">
            	<h2 className="bookshelf-title">{this.props.bookShelf}</h2>
            		<div className="bookshelf-books">
            			<ol className="books-grid">
            				{books.map((book) => {
            					<li key={book.id}>
            						<div className="book">
            							<div className="book-top">
            								<div className="book-cover" style={{backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
            								</div>
            									<div className="book-self-changer">
            										<select onChange={changeShelf} value={book.shelf}>
            											<option value="" disabled>Move to...</option>
            											<option value="currentlyReading">Currently Reading</option>
            											<option value="wantToRead">Want to Read</option>
            											<option value="read">Read</option>
            											<option value="none">None</option>
            										</select>
            									</div>
            							</div>
            							<div className="book-title">{book.title}</div>
            							<div className="book-authors">{book.authors.join(' & ')}</div>
            						</div>
            					</li>
            				})}
            			</ol>
            		</div>
            		
            </div>
				

		)
	}
}

export default ListBooks