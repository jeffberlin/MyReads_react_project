import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListBooks extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired
	}

	state = {
		query: ''
	}

	updateQuery = (query, maxResults) => {
		this.setState({ query: query.trim() })
	}

	clearQuery = () => {
		this.setState({ query: '' })
	}

	render() {
		const { books } = this.props
		const { query } = this.state

		let showingBooks
		if (query) {
			const match = new RegExp(escapeRegExp(query), 'i')
			showingBooks = this.props.filter((book) => match.test(book.title, book.authors))
		} else {
			showingBooks = this.props.books
		}

		showingBooks.sort(sortBy('title', 'authors'))

		return (
			// backgroundImage: `url(${book.imageLinks.thumbnail})`

				<div className="search-books">
					<div className="search-books-bar">
					  <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
					  <div className="search-books-input-wrapper">
					    <input 
					    	type="text" 
					    	value={query}
					    	onChange={(event) => this.updateQuery(event.target.value)}
					    	placeholder="Search by title or author"
					    />
					  </div>
					</div>
					<div className="search-books-results">
					  <ol className="books-grid"></ol>
					</div>
				</div>
		)
	}
}

export default ListBooks