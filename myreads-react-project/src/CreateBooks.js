import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'

// class CreateBook extends Component {
// 	handleSubmit = (e) => {
// 		e.preventDefault()
// 		const values = serializeForm(e.target, { hash: true})
// 		if (this.props.onCreateBook)
// 			this.props.onCreateBook(values)
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<Link className="close-create-book" to="/">Close</Link>
// 				<form onSubmit={this.handleSubmit}
// 					className="create-book-form">
// 					<ImageInput className="create-book-")
// 	}
// }