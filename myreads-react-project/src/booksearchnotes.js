{showingBooks.map((book) => (
<li key={book.id}>
<div className="book">
	<div className="book-top">
		<div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
		</div>
		<div className="book-shelf-changer">
			<select selected value={this.state.shelf} onChange={(event) => onUpdateBookStatus(book, event.target.value)}>
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


{showingBooks.length !== books.length && (
<div className="search-books-results">
	<ol className="books-grid">
		<li key={books.id}>
		<div className="book">
			<div className="book-top">
				<div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${books.imageLinks.thumbnail})` }}/>
			</div>
		</div>
		</li>
	</ol>
</div>
)}