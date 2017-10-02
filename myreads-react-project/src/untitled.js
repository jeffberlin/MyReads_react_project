// <div className="app">

      //   <Route exact path="/" render={() => (
      //     <ListBooks
      //       books={this.state.books}
      //       shelf={this.state.shelf}
      //       onUpdateBookStatus={(book, shelf) => {
      //         this.updateBookStatus(book, shelf)
      //       }}
      //     />
      //   )}/>

    ListBooks  RETURN (
			<div className="list-books">
	            <div className="list-books-title">
	              <h1>MyReads</h1>
	            </div>
	            
	            <div className="list-books-content">
	            	<div>

	            	<ListBooks
	            		bookShelf="Currently Reading"
	            		books={currentlyReading.sort(sortBy("title"))}
	            		changeShelf={this.changeShelf}
	            	/>

	            	<ListBooks
	            		bookShelf="wantToRead"
	            		books={wantToRead.sort(sortBy("title"))}
	            		changeShelf={this.changeShelf}
	            	/>

	            	<ListBooks
	            		bookShelf="read"
	            		books={read.sort(sortBy("title"))}
	            		changeShelf={this.changeShelf}
	            	/>
      	)

    APP.JS

     <Route path="/search" render={({ history }) => (
          <Search
            books={this.state.books}
            shelf={this.state.shelf}
            onSearchBook={(query) => {
              this.searchBook(query)
            }}
            updateBookStatus={(book, shelf) => {this.updateBook(book, shelf)}}
          />
        )}/>


     <div className="open-search">
			          <Link to="/search">Add a book</Link>
			        </div>
      