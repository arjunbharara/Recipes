import React, {Component} from 'react';
import {OTHER_ERROR, CREATE_SUCCESS, CATEGORY_GET} from '../constants/Constants';
import CreateForm from './CreateForm';
import ShowAlert from '../layout/ShowAlert';
import {postCreateData, getData} from '../api-calls/api-calls';
import AuthContext from '../auth/AuthContext';
import {Redirect} from 'react-router-dom';

const formValid = (input) => {
    let valid = true;
    Object.values(input).forEach(val => {
        if(val === null) {
            valid = false;
    }});
    return valid;
};

class Create extends Component {
    constructor(props){
        super(props);

        this.state = {
            input: {
                title: null,
                ingredients: null,
                preparation: null,
                category: 1
            },
            categories: [],
            message: "",
            success: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        getData(CATEGORY_GET)
        .then(json => {
            this.setState({
                categories: json,
                isLoading: false
            });
        })
        .catch(console.log);
    }

    handleSubmit(e) {
        e.preventDefault();
        // Reset message
        this.setState({message: ""});

        const input = { ...this.state.input };
        if (formValid(input)) {
            postCreateData(input.title, input.ingredients, input.preparation, input.category)
            .then(() => {
                this.setState({success: true});
            })
            .catch(() => {
                this.setState({message: OTHER_ERROR});
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
        const {message, success, categories} = this.state;

        if(!this.context.isLoggedIn) {
            return (<Redirect to='/'/>);
        }
        if(success) {
            return (<ShowAlert message={CREATE_SUCCESS} type="success"/>);
        }
        else {
            return (
                <CreateForm
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    message={message}
                    categories={categories}
                />);
        }
    }
}
Create.contextType = AuthContext;

export default Create;