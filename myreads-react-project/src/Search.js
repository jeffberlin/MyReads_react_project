import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import { Route, Link } from 'react-router-dom'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
// import SearchPage from './SearchPage'

class Search extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired
		//onUpdateBookStatus: PropTypes.func.isRequired,
		//onSearchBook: PropTypes.func.isRequired,
		//onChangeShelf: PropTypes.func.isRequired
		//shelf: PropTypes.string.isRequired
	}

	state = {
		books: [],
		query: ''

	}

	updateQuery = (query) => {
		this.setState({ query })
	}

	bookShelfLocation = (bookId) => {
		return this.state.books.filter(book => book.id === bookId)
	}

	searchBook = (query) => {
	    if (query.trim() !== '') {
	      BooksAPI.search(query).then(res => {
	        if (res && res.length) {
	        	this.setState({books: res, query: query
	        })
	      } else {
	        this.setState({query: query})
	      }
	      })
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

	componentDidMount() {
	    BooksAPI.getAll().then(books => {
	      this.setState({ books })
	    })
	}

	render() {

		const { books, shelf, searchBook, updateBook, changeShelf } = this.props
		const { query } = this.state

		let bookResults
		if (query) {
			const match = new RegExp(escapeRegExp(query), 'i')
			bookResults = this.props.books.filter((book) => match.test(book.title)||match.test(book.authors))
		} else {
			bookResults = books
		}

		return (

			<div className="searchApp">

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
					{books.map((book) => (
						<li key={book.id}>
						<div className="book">
							<div className="book-top">
								<div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})`
								}}/>
								<div className="book-shelf-changer">
									<select selected value={this.state.shelf}
										onChange={changeShelf}>
									<option value="none">Move to...</option>
									<option value="currentlyReading">Currently Reading</option>
									<option value="wantToRead">Want to Read</option>
									<option value="read">Read</option>
									</select>
								</div>
							</div>
							<div className="book-title">{book.title}</div>
							<div className="book-authors">{book.authors.join(' & ')}</div>
						</div>
						</li>
					))}
					</ol>
				</div>
			</div>

		)
	}
}

export default Search