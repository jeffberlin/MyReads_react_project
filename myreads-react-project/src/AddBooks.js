import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'

class AddBooks extends Component {
	handleSubmit = (e) => {
		e.preventDefault()
		const values = serializeForm(e.target, { hash: true})
		if (this.props.onAddBooks)
			this.props.onAddBooks(values)
	}

	render() {
		return (
			<div>
				<Link className="close-search" to="/">Close</Link>
			</div>
		)
	}
}
export default AddBooks