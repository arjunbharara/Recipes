import React, {Component} from 'react';
import RegisterForm from './RegisterForm';
import {Redirect} from 'react-router-dom';
import { USERNAME_EXISTS, OTHER_ERROR } from '../constants/Constants';
import {postRegistrationData} from '../api-calls/api-calls';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ input, formErrors }) => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
      if(val.length > 0) {
          valid = false;
    }});
    Object.values(input).forEach(val => {
        if(val === null) {
            valid = false;
    }});
    return valid;
};

class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            input: {
                email: null,
                username: null,
                password: null,
                passwordConfirm: null
            },
            formErrors: {
                email: "",
                username: "",
                password: "",
                passwordConfirm: "",
            },
            message: "",
            success: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        // Reset message
        this.setState({message: ""});

        const input = { ...this.state.input };
        if (formValid(this.state)) {
            postRegistrationData(input.username, input.email, input.password)
            .then(() => {
                this.setState({success: true});
            })
            .catch(error => {
                if (error.message === '409'){
                    this.setState({message: USERNAME_EXISTS});
                }
                else {
                    this.setState({message: OTHER_ERROR});
                }
            })
        }
        else {
            this.setState({message: "Please fill out all fileds"});
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        let input = {...this.state.input};

        switch (name) {
            case "username":
            formErrors.username =
                value.length < 3 ? "Minimum 3 characters required" : "";
            break;
            case "email":
            formErrors.email = emailRegex.test(value)
                ? ""
                : "Invalid email address";
            break;
            case "password":
            formErrors.password =
                value.length < 8 ? "Minimum 8 characters required" : "";
            break;
            case "passwordConfirm":
            formErrors.passwordConfirm =
                value !== this.state.input.password ? "Passwords do not match" : "";
            break;
            default:
            break;
        }
        input[name] = value;
        this.setState({ formErrors, input });
    };

    render(){
        const {formErrors, message, success} = this.state;

        // Redirect to login after successful registration
        if (success) {
            return (<Redirect push={true} to={{
                pathname: '/login',
                state: {fromRegistration: true} //TODO
            }}/>);
        }
        // Show registration form
        else {
            return (
                <RegisterForm 
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    formErrors={formErrors}
                    message={message}
                />
            );
        }
    }
}

export default Register;