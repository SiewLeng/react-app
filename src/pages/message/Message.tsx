import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import client from '../../feathers';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getLoginState } from '../login/loginSlice';
import { update } from './messageSlice';

const LoadMessages = ({ messages }: any): any => {
    const array = messages.map((message: any) => {
        return (
            <div key={message.id}>
                <div>userId: {message.userId}</div>
                <div> {message.text} </div>
            </div>
        )
    });
    return(
        <div>
            {array}
        </div>
    ) 
}

export const Message = () => {
    const dispatch = useAppDispatch();
    const loginState = useAppSelector(getLoginState);
    const [message, setMessage] = useState('');
    const [messages, setMessges] = useState([]);

    useEffect(() => {
        getExistingMessage();
    });

    function getExistingMessage () {
        client.service('messages').find()
        .then((results: any) => {
            setMessges(results.data);
            dispatch(update(results.data));
        }).catch((err: any) => {
        });
    }

    function handleChange(event: any) {
        setMessage(event.target.value);
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        const userData = loginState.userData;
        client.service('messages').create({
            id: uuidv4(),
            userId: userData.id,
            text: message
        });
        setMessage('');
    }

    return (
        <div>
            <h2> This is Message page.</h2>
            <h2>Email: {loginState.userData.email}</h2>
            <LoadMessages messages={messages}/>
            <form onSubmit={handleSubmit}>
                <label> Enter Message: 
                    <input type='text' value={message} onChange={handleChange}/>
                </label>
                <input type='submit' value='Submit'/>
            </form>
            <Link to='/counter'> Counter Page </Link>
            <Link to='/'> Home Page </Link>
            <Link to='/login'> Login Page </Link>
        </div>
    )
}

