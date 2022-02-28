import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { 
    selectLogin 
} from '../login/loginSlice';

export const Home = () => {
	const loginState = useAppSelector(selectLogin);
    
	/*
	useEffect(()=> {
		console.log("fired !!!",{ loginState });
	},[loginState])
	*/

	return (
		<div>
			<h2> This is Home page </h2>
			<h2> Email: {loginState.userData.email}</h2>
			<div>
				<Link to='/counter'> Counter Page </Link>
				<Link to='/login'> Login Page </Link>
				<Link to='/message'> Message Page </Link>
			</div>
		</div>
	)
}