import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import { Link } from 'react-router-dom'

class BookSearch extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired,
		shelf: PropTypes.string.isRequired,
		onUpdateBookStatus: PropTypes.func.isRequired,
		onSearchBooks: PropTypes.func.isRequired
	}

	state = {
		query: ''
	}

	updateQuery = (query) => {
		this.setState({ query })
		this.props.onSearchBooks(query)
	}

	render() {

		const { books, onUpdateBookStatus, shelf } = this.props
		const { query } = this.state

		let showingBooks
		if (query) {
			let match = new RegExp(escapeRegExp(query), 'i')
			showingBooks = books.filter((book => match.test(book.title) || match.test(book.authors) && book.imageURL && book.authors && book.title && book.id))
		} else {
			showingBooks = books
		}

		return (

			<div className="list-books">
				<div className="search-books">
					<div className="search-books-bar">
					  <Link className="close-search" to="/">Close</Link>
					  <div className="search-books-input-wrapper">
					    <input 
					    	type="text" 
					    	value={this.state.query}
					    	onChange={event => this.updateQuery(event.target.value)}
					    	placeholder="Search by title or author"
					    />
					  </div>
					</div>
				</div>

				<div className="search-books-results">
					<ol className="books-grid">
						{showingBooks.map((book) => (
							<li key={book.id}>
							<div className="book">
								<div className="book-top">
									<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
									</div>
									<div className="book-shelf-changer">
										<select selected value={this.state.shelf} onChange={event => this.onUpdateBookStatus(book, event.target.value)}>
											<option value="none" disabled>Move to...</option>
											<option value="currentlyReading">Currently Reading</option>
											<option value="wantToRead">Want to Read</option>
											<option value="read">Read</option>
											<option value="none">None</option>
										</select>
									</div>
								</div>
								<div className="book-title">{book.title}</div>
								<div className="book-authors">{book.authors}</div>
							</div>
							</li>
						))}
					</ol>
				</div>
			</div>
		)
	}

}

export default BookSearch