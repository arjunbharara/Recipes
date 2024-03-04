import React from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import ShowAlert from '../layout/ShowAlert';

const RegisterForm = (props) => {
    return(
    <React.Fragment>
    {
    <ShowAlert message={props.message} type="danger"/>
    }
    <Form onSubmit={props.handleSubmit} noValidate className='p-5 form'>
        <h3 className="text-center pb-3">Create account</h3>
        <FormGroup>
            <Label for="email">Email</Label>
            <Input
            autoFocus
            type="email" 
            name="email" 
            placeholder="Enter email"
            onChange={props.handleChange}
            />
            {
            props.formErrors.email.length > 0 ? 
            (<span className="text-danger">{props.formErrors.email}</span>) : ""
            }
        </FormGroup>
        <FormGroup>
            <Label for="username">Username</Label>
            <Input 
            type="text" 
            name="username"
            placeholder="Enter username" 
            maxLength="25" 
            onChange={props.handleChange}
            />
            {
            props.formErrors.username.length > 0 ? 
            (<span className="text-danger">{props.formErrors.username}</span>) : ""
            }
        </FormGroup>
        <FormGroup>
            <Label for="password">Password</Label>
            <Input 
            type="password" 
            name="password" 
            placeholder="Enter password"
            onChange={props.handleChange}
            />
            {
            props.formErrors.password.length > 0 ? 
            (<span className="text-danger">{props.formErrors.password}</span>) : ""
            }
        </FormGroup>
        <FormGroup>
            <Label for="passwordConfirm">Confirm password</Label>
            <Input 
            type="password"
            name="passwordConfirm"
            placeholder="Confirm password"
            onChange={props.handleChange}
            />
            {
            props.formErrors.passwordConfirm.length > 0 ? 
            (<span className="text-danger">{props.formErrors.passwordConfirm}</span>) : ""
            }
        </FormGroup>
        <p className="text-muted">
            Already have an account? <Link to="/login">Login</Link>
        </p>
        <Button color="primary" type="submit">Create</Button>
    </Form>
    </React.Fragment>
    );
}
export default RegisterForm;