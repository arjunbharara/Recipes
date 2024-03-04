import React from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {REGISTER_SUCCESS} from '../constants/Constants';
import ShowAlert from '../layout/ShowAlert';

const LoginForm = (props) => {
    const type = (props.message === REGISTER_SUCCESS) ? "success" : "danger";
    return(
    <React.Fragment>
    {
        <ShowAlert message={props.message} type={type}/>
    }
    <Form onSubmit={props.handleSubmit} noValidate className='p-5 form'>
        <h3 className="text-center pb-3">Log in</h3>
        <FormGroup>
            <Label for="username">Username</Label>
            <Input 
            autoFocus
            type="text" 
            name="username"
            placeholder="Enter username"
            onChange={props.handleChange}
            />
        </FormGroup>
        <FormGroup>
            <Label for="password">Password</Label>
            <Input 
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={props.handleChange}
            />
        </FormGroup>
        <p className="text-muted">Don't have an account? <Link to="/register">Create account</Link>
        </p>
        <Button color="primary" type="submit">Login</Button>
    </Form>
    </React.Fragment>
    );
}
export default LoginForm;