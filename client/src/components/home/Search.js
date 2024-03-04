import React from 'react';
import {Form, Input, Button} from 'reactstrap';


const Search = (props) => {
    return (
        <Form onSubmit={props.handleSubmit} className="form-check-inline">
            <Input
                type="search"
                placeholder="Search"
                aria-label="search"
            />
            <Button type="submit">Search</Button>
        </Form>
    );
}

export default Search;