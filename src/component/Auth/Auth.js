import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../../ducks/reducer'

export class Auth extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            redirect: false
        }

    }

    userHandleChange = (name) => {
        this.setState({ username: name });
    }

    passHandleChange = (pass) => {
        this.setState({ password: pass });
    }

    login = () => {
        const lowerCaseUsername = this.state.username.toLowerCase();

        axios.post('http://localhost:3005/login', {
            username: lowerCaseUsername,
            password: this.state.password
        }).then(res => {
            if (res.data.length) {
                const { id, username, profile_pic } = res.data[0];

                this.props.setUser(id, username, profile_pic);
                this.setState({ redirect: true })
            } else {
                console.log('incorrect username or password')
            }
        }).catch(err => {
            console.log('Login Failed! ', err)
        })
    }

    register = () => {
        const lowerCaseUsername = this.state.username.toLowerCase();

        axios.post('http://localhost:3005/register', {
            username: lowerCaseUsername,
            password: this.state.password
        }).then(res => {
            if (res.data.exists) {
                console.log('User already exists! Please try a different username.')
            } else {
                this.props.setUser(res.data.id, res.data.username, res.data.profile_pic);
                this.setState({ redirect: true })
            }
        }).catch(err => {
            console.log('Register failed! ', err)
        })
    }

    render() {

        if (this.state.redirect === true) {
            return <Redirect to='/dashboard' />
        } else {
            return (
                <div>
                    <h2>Auth</h2>
                    <input className="auth-input" name="username" type="text" placeholder="Username" value={this.state.username} onChange={(e) => this.userHandleChange(e.target.value)}/>
                    <input className ="auth-input" name="password" type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.passHandleChange(e.target.value)} />
                    <div className="auth-button" onClick={() => this.login()} >Login</div>
                    <div className="auth-button" onClick={() => this.register()} >Register</div>
                </div>
            )
        }
    }
}

export default connect( null, { setUser } )( Auth );