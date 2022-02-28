import { monitorEventLoopDelay } from 'perf_hooks';
import React from 'react';
import styles from './Login.module.css';
import client from '../../feathers';
import { textSpanContainsPosition } from 'typescript';

type Props = {
}

type State = {
    email: string,
    password: string
} 

export class Login extends React.Component <Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        const id = event.target.id;
        if (id == 'email') {
            this.setState({ email: event.target.value });
        } else if (id == 'password') {
            this.setState({ password: event.target.value });
        }
    }

    handleSubmit(event: any) {
        console.log('this.state >>> ', this.state);
        event.preventDefault();
        client.service('users').find({
            query: { email: this.state.email }
        }).then((result: any) => {
            console.log(result);
        })
    }

    render() {
        return (
            <div>
                <h2>This is login page</h2>
                <form onSubmit={this.handleSubmit}>
                    <label> Email: 
                        <input type='text' value={this.state.email} onChange={this.handleChange} id='email'></input>
                    </label>
                    <label> Password: 
                        <input type='text' value={this.state.password} onChange={this.handleChange} id='password'></input>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}