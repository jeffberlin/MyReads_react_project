import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import { Route, Link } from 'react-router-dom'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'


class Search extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired
	}

	state = {
		books: [],
		query: ''
	}

	bookShelfLocation = (bookId) => {
		return this.state.books.filter(book => book.id === bookId)
	}

	updateQuery = (query) => {
		this.setState({ query: query.trim() })
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
	        books: oldState.searchResults.map(book => {
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

		const { books } = this.props;
		const { query } = this.state;

		const currentlyReading = this.state.books.filter(book => book.shelf === "currentlyReading")

    	const wantToRead = this.state.books.filter(book => book.shelf === "wantToRead")

    	const read = this.state.books.filter(book => book.shelf === "read")

    	let showingBooks
    	if (query) {
    		const match = new RegExp(escapeRegExp(query), 'i')
    		showingBooks = books.filter((book) => match.test(book.title)||match.test(book.authors))
    	} else {
    		showingBooks = books
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
	    				{showingBooks.map((book) => {
	    					<li key={book.id}>
								<div className="book">
									<div className="book-top">
										<div className="book-cover" style={{backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
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

export default Search