import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import styles from './Login.module.css';
import client from '../../feathers';
import { 
    login,
    getLoginState
} from './loginSlice';
import { store } from '../../app/store';

type Props = {
}

type State = {
    email: string,
    password: string
} 

export const Login = () =>{
    const dispatch = useAppDispatch();
    const loginState = useAppSelector(getLoginState);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChange(event: any) {
        const id = event.target.id;
        if (id == 'email') {
            setEmail(event.target.value);
        } else if (id == 'password') {
            setPassword(event.target.value);
        }
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        client.service('users').find({
            query: { email, password }
        }).then((result: any) => {
            const userData = {
                id: result.data[0].id,
                email: result.data[0].email,
                hobbies: result.data[0].hobbies,
                dateOfBirth: result.data[0].dateOfBirth
            }
            console.log({ result });
            dispatch(login(userData));
        });
    }

    function seeUserDataAndState() {
        console.log({ loginState });
        console.log('store.state >>> ', store.getState());
    }

    return (
        <div>
        <h2>This is login page</h2>
        <form onSubmit={handleSubmit}>
            <label> Email: 
                <input type='text' value={email} onChange={handleChange} id='email'></input>
            </label>
            <label> Password: 
                <input type='text' value={password} onChange={handleChange} id='password'></input>
            </label>
            <input type="submit" value="Submit"/>
        </form>
        <div>
            <button onClick={seeUserDataAndState}> See User Data </button>
        </div>
        <div>
            <Link to='/counter'> Counter Page </Link>
			<Link to='/'> Home Page </Link>
			<Link to='/message'> Message Page </Link>
        </div>
    </div>
    )
}