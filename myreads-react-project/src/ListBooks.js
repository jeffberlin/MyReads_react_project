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

	updateQuery = (query) => {
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
			showingBooks = this.props.filter((book) => match.test(book.title))
		} else {
			showingBooks = this.props.books
		}

		showingBooks.sort(sortBy('title'))

		return (
			<div className='list-books'>
				<div className='list-books-top'>
					<input className='search-books' type='text' value={query} onChange={(event) => this.updateQuery(event.target.value)} />
				</div>
			</div>
			)
	}
}