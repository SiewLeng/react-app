import { Link } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import client from '../../feathers';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getLoginState } from '../login/loginSlice';
import { update } from './messageSlice';

const LoadMessages = ({ messages }: any): any => {
    const array = messages.map((message: any, index: number) => {
        return (
            <div key={index}>
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
    const _isMounted = useRef(true);
    const dispatch = useAppDispatch();
    const loginState = useAppSelector(getLoginState);
    type intialMessagesType = [] | {userId: string, text: string} [];
    const initialMessages: intialMessagesType = [];
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(initialMessages);
    
    useEffect(() => {
        getExistingMessage();
        return () => { 
            // ComponentWillUnmount in component
            console.log('Component has unmounted in message page');
            _isMounted.current = false;
        }
    }, []);

    useEffect(() => {
        listenToNewMessage();
    }, [messages]);

    function addMessage(message: any) {
        const updatedMessages = [];
        for (let i = 0; i < messages.length; i++) {
            updatedMessages.push(messages[i]);
        }
        updatedMessages.push({
            userId: message.userId,
            text: message.text
        });
        dispatch(update(updatedMessages));
        setMessages(updatedMessages);
    }
     
    function listenToNewMessage() {
        client.service('messages').on('created', (message: any) => {
            if (_isMounted.current) {
                addMessage(message);
            }
        });
        return () => {
            client.service('messages').removeListener('created');
        }
    };
    
    function getExistingMessage () {
        client.service('messages').find({ query: { num: 10 } })
        .then((results: any) => {
            if (_isMounted.current) {
                const messages = [];
                console.log({results});
                for (let i = 0; i < results.length; i++) {
                    messages.push({
                        userId: results[i]['userId'],
                        text: results[i]['text'],
                    });
                }
                dispatch(update(messages));
                setMessages(messages);
                }
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
        }).then(() => {
            setMessage('');
        });
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

