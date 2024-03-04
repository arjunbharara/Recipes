import React, {Component} from 'react';
import LoginForm from './LoginForm';
import { OTHER_ERROR, BAD_CREDENTIALS, REGISTER_SUCCESS } from '../constants/Constants';
import {Redirect} from 'react-router-dom';
import AuthContext from './AuthContext.js';
import {postLoginData} from '../api-calls/api-calls';

const formValid = (input) => {
    let valid = true;
    Object.values(input).forEach(val => {
        if(val === null) {
            valid = false;
    }});
    return valid;
};

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            input: {
                username: null,
                password: null
            },
            message: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        
        if (this.props.location.state) {
            this.setState({message: REGISTER_SUCCESS});
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        // Reset message
        this.setState({message: ""});

        const input = { ...this.state.input };
        if (formValid(input)) {
            postLoginData(input.username, input.password)
            .then(result => {
                this.context.login(input.username, result['token']);
            })
            .catch(error => {
                if (error.message === '403') {
                    this.setState({message: BAD_CREDENTIALS})
                }
                else {
                    this.setState({message: OTHER_ERROR})
                }
            });
        }
        else {
            this.setState({message: "Please fill out all fileds"});
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        let input = {...this.state.input};
        input[name] = value;
        this.setState({input});
    }

    render() {
        const {message} = this.state;

        
        if (this.context.isLoggedIn) {
            return <Redirect push={true} to={{pathname: '/'}}/>;
        }
        else {
            return (
                <LoginForm
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                message={message}
                />
            );
        }
    }
}
Login.contextType = AuthContext;

export default Login;