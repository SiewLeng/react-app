import React from 'react';
import { Link } from 'react-router-dom';

export class Home extends React.Component {
	render() {
		return (
			<div>
			  <h2> This is Home page </h2>
				<div>
					<Link to='/counter'> Counter Page </Link>
					<Link to='/login'> Login Page </Link>
				</div>
			</div>
		)
	}
}