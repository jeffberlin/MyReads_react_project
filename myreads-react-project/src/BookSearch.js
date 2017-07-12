import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'

class BookSearch extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired,
		//shelf: PropTypes.string.isRequired,
		onUpdateBookStatus: PropTypes.func.isRequired,
		//onSearchBooks: PropTypes.func.isRequired
	}

	state = {
		query: ''
	}

	updateQuery = (query) => {
		this.setState({ query })
		this.props.onSearchBooks(query)
	}

	clearQuery = () => {
		this.setState({ query: '' })
	}

	render() {

		const { books, onUpdateBookStatus, shelf } = this.props
		const { query } = this.state

		let showingBooks

		if (query) {
			const match = new RegExp(escapeRegExp(query), 'i')
			showingBooks = this.props.books.filter((book) => match.test(book.title)||match.test(book.authors))
		} else {
			showingBooks = books.map((book) => (book = false))
		}

		return (

			<div className="list-books">
				<div className="search-books">
					<div className="search-books-bar">
					  <Link className="close-search" to="/">Close</Link>
					  <div className="search-books-input-wrapper">
					    <input 
					    	type="text" 
					    	value={query}
					    	onChange={(event) => this.updateQuery(event.target.value)}
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
								<div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})`
								}}/>
								<div className="book-shelf-changer">
									<select selected value={this.state.shelf} onChange={(event) => onUpdateBookStatus(book, event.target.value)}>
									<option value="none">Move to...</option>
									<option value="currentlyReading">Currently Reading</option>
									<option value="wantToRead">Want to Read</option>
									<option value="read">Read</option>
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
		)
	}

}

export default BookSearch