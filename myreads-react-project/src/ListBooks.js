import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired,
		// onUpdateBookStatus: PropTypes.func.isRequired,
		//onSearchBook: PropTypes.func.isRequired,
		//onChangeShelf: PropTypes.func.isRequired
	}

	state = {
		query: ''
	}

	// updateBookStatus = (book, shelf) => {
	//     if (shelf) {
	//       BooksAPI.update(book, shelf).then(books => this.setState({ books: books })).catch(function(e){
	//         console.log('error',e)
	//       });

	//     if (book.shelf !== shelf) {
	//       book.shelf = shelf
	//       BooksAPI.update(book, shelf).then((res) => { this.setState(state => ({ books: state.books.filter(b => b.id !== book.id).concat([ book ]) }))}
	//       )}
	//     }
	// }

	updateBook = (book, shelf) => {
	    this.setState((state) => ({
	      books: state.books.filter((b) => b.id !== book.id)
	    }))

	    BooksAPI.update(book, shelf)
  	}

	render() {
		
		const { books } = this.props;
		
		// let bookShelves
		// if (shelf) {
		// 	const match = new RegExp(escapeRegExp(shelf), 'i')
		// 	bookShelves = this.state.books.filter(book => book.shelf === "wantToRead")
		// 	bookShelves = this.state.books.filter(book => book.shelf === "read")
		// 	bookShelves = this.state.books.filter(book => book.shelf === "currentlyReading")
		// } else {
		// 	bookShelves = books
		// }

		return (		

            <div className="bookshelf">
            	<h2 className="bookshelf-title">{this.props.bookShelf}</h2>
        		<div className="bookshelf-books">
        			<ol className="books-grid">
        				{books.map((book) => {
        					<li key={book.id}>
        						<div className="book">
								<div className="book-top">
									<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
									</div>
									<div className="book-self-changer">
										<select onChange={this.changeShelf} value={this.state.shelf}>
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