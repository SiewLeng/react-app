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

    async function handleSubmit(event: any) {
        event.preventDefault();
       try {
            await client.reAuthenticate();
       } catch(error) {
            await client.authenticate({
                strategy: 'local',
                email,
                password
            }).then((result: any) => {
                const { user } = result;
                const userData = {
                    id: user.id,
                    email: user.email,
                    hobbies: user.hobbies ? user.hobbies : [],
                    dateOfBirth: user.dateOfBirth
                }
                dispatch(login(userData));
            }).catch((err: any) => {
                console.log(err);
            });
       }
    }

    function seeUserDataAndState() {
        console.log({ loginState });
        console.log('store.state >>> ', store.getState());
    }

    return (
        <div>
        <h2>This is login page</h2>
        <form onSubmit={handleSubmit}>
            <div className={[styles['clearfix'], styles['form-row']].join(' ')}>
                <label className={styles['input-text-label']}> Email:</label>
                <input className={styles['input-text']} type='text' value={email} onChange={handleChange} id='email'></input>
            </div>
            <div className={styles['clearfix']}>
                <label className={styles['input-text-label']}> Password: </label>
                <input className={styles['input-text']} type='text' value={password} onChange={handleChange} id='password'></input>
            </div>
            <input className={styles['button']}type="submit" value="Submit"/>
        </form>
        <div>
            <button className={styles['button']} onClick={seeUserDataAndState}> See User Data </button>
        </div>
        <div>
            <Link to='/counter'> Counter Page </Link>
			<Link to='/'> Home Page </Link>
			<Link to='/message'> Message Page </Link>
        </div>
    </div>
    )
}