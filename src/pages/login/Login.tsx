import { monitorEventLoopDelay } from 'perf_hooks';
import React from 'react';
import styles from './Login.module.css';

type Props = {
}

type State = {
    name: string,
    password: string
} 

export class Login extends React.Component <Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        const id = event.target.id;
        if (id == 'name') {
            this.setState({ name: event.target.value });
        } else if (id == 'password') {
            this.setState({ password: event.target.value });
        }
    }

    handleSubmit(event: any) {
        console.log('this.state >>> ', this.state);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h2>This is login page</h2>
                <form onSubmit={this.handleSubmit}>
                    <label> Name: 
                        <input type='text' value={this.state.name} onChange={this.handleChange} id='name'></input>
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