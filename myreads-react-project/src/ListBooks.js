import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'

class ListBooks extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		//onUpdateShelves: PropTypes.func.isRequired,
		//shelf: PropTypes.string.isRequired
	}

	state = {
		query: ''
	}

	render() {
		const { books, onUpdateShelves, shelf } = this.props

		let bookShelf

		if (shelf) {
			const match = new RegExp(escapeRegExp(shelf), 'i')

			if (shelf === "wantToRead") {
				bookShelf = books.filter(book => match.test(book.shelf))
			} else if (shelf === "Read") {
				bookShelf = books.filter(book => match.test(book.shelf))
			} else if (shelf === "currentlyReading") {
				bookShelf = books.filter(book => match.test(book.shelf))}
			} else {
				bookShelf = books
			}

		return (
			<div className="list-books">
	            <div className="list-books-title">
	              <h1>MyReads</h1>
	            </div>
	            <div className="list-books-content">
	            	<div>
		                <div className="bookshelf">
		                  	<h2 className="bookshelf-title">Currently Reading</h2>
		                  	<div className="bookshelf-books">
				                <ol className="books-grid">
				                   	{bookShelf.map((book) => (
				                   		<li key={book.id}>
					                   		<div className="book">
					                   			<div className="book-top">
					                   				<div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
					                   				</div>
						                   			<div className="book-shelf-changer">
						                   				<select value={this.state.shelf} selected onChange={(event) => this.onUpdateShelves(book, event.target.value)}>
							                   				<option value="none" disabled>Move to...</option>
							                   				<option value="currentlyReading">Currently Reading</option>
							                   				<option value="wantToRead">Want to Read</option>
							                   				<option value="read">Read</option>
							                   				<option value="none">None</option>
						                   				</select>
						                   			</div>
						                   		</div>
						                   		<div className="book-title">{book.title}</div>
						                   		<div className="book-authors">{book.authors.join(' / ')}</div>
						                   	</div>
				                   		</li>
				                   	))}
				                </ol>
				            </div>
			            </div>
			            <div className="bookshelf">
			            	<h2 className="bookshelf-title">Want to Read</h2>
			            	<div className="bookshelf-books">

				            	<ol className="books-grid">
				                   	{bookShelf.map((book) => (
				                   		<li key={book.id}>
					                   		<div className="book">
					                   			<div className="book-top">
					                   				<div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
					                   				</div>
						                   			<div className="book-shelf-changer">
						                   				<select value={this.state.shelf} selected onChange={(event) => this.onUpdateShelves(book, event.target.value)}>
							                   				<option value="none" disabled>Move to...</option>
							                   				<option value="currentlyReading">Currently Reading</option>
							                   				<option value="wantToRead">Want to Read</option>
							                   				<option value="read">Read</option>
							                   				<option value="none">None</option>
						                   				</select>
						                   			</div>
						                   		</div>
						                   		<div className="book-title">{book.title}</div>
						                   		<div className="book-authors">{book.authors.join(' / ')}</div>
						                   	</div>
				                   		</li>
				                   	))}
				                </ol>
				            </div>
				        </div>
				        <div className="bookshelf">
			            	<h2 className="bookshelf-title">Read</h2>
			            	<div className="bookshelf-books">

				            	<ol className="books-grid">
				                   	{bookShelf.map((book) => (
				                   		<li key={book.id}>
					                   		<div className="book">
					                   			<div className="book-top">
					                   				<div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
					                   				</div>
						                   			<div className="book-shelf-changer">
						                   				<select value={this.state.shelf} selected onChange={(event) => this.onUpdateShelves(book, event.target.value)}>
							                   				<option value="none" disabled>Move to...</option>
							                   				<option value="currentlyReading">Currently Reading</option>
							                   				<option value="wantToRead">Want to Read</option>
							                   				<option value="read">Read</option>
							                   				<option value="none">None</option>
						                   				</select>
						                   			</div>
						                   		</div>
						                   		<div className="book-title">{book.title}</div>
						                   		<div className="book-authors">{book.authors.join(' / ')}</div>
						                   	</div>
				                   		</li>
				                   	))}
				                </ol>
				            </div>
				        </div>
				    </div>
				</div>
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
			</div>

		)
	}
}

export default ListBooks