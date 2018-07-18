import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Auth extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: ''
        }

    }

    userHandleChange = (name) => {
        this.setState({ username: name });
    }

    passHandleChange = (pass) => {
        this.setState({ password: pass });
    }

    login = () => {
        axios.post('http://localhost:3005/login', {
            username: this.state.username,
            password: this.state.password
        }).then(res => {
            if (res.data.length) {
                console.log('Login successfull')
            } else {
                console.log('incorrect username or password')
            }
        }).catch(err => {
            console.log('Login Failed! ', err)
        })
    }

    register = () => {
        axios.post('http://localhost:3005/register', {
            username: this.state.username,
            password: this.state.password
        }).then(res => {
            if (res.data.exists) {
                console.log('User already exists! Please try a different username.')
            } else {
                console.log('User is available.')
            }
        }).catch(err => {
            console.log('Register failed! ', err)
        })
    }

    render() {
        return (
            <div>
                <h2>Auth</h2>
                <input className="auth-input" name="username" type="text" placeholder="Username" value={this.state.username} onChange={(e) => this.userHandleChange(e.target.value)}/>
                <input className ="auth-input" name="password" type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.passHandleChange(e.target.value)} />
                <div className="auth-button" onClick={() => this.login()} >Login</div>
                <div className="auth-button" onClick={() => this.register()} >Register</div>
                {/* <Link to="/Dashboard"><div className="auth-button">Register</div></Link> */}
            </div>
        )
    }
}