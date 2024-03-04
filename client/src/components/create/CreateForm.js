import React from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import ShowAlert from '../layout/ShowAlert';

const CreateForm = (props) => {

    const categories = props.categories.map(category => (
        <option key={category.id} value={category.id}>{category.name}</option>
    ));

    return (<React.Fragment>
    {
    <ShowAlert message={props.message} type="danger"/>
    }
    <Form onSubmit={props.handleSubmit} noValidate className="p-5 form" id="create">
    <h3 className="text-center py-3">Create a new recipe</h3>
    <FormGroup>
        <Label for="title">Title</Label>
         <Input
            autoFocus
            type="text"
            name="title"
            maxLength="50"
            placeholder="Enter title"
            onChange={props.handleChange}
        />
    </FormGroup>
    <FormGroup>
        <Label for="ingredients">Ingredients</Label>
        <Input
            type="textarea"
            name="ingredients"
            placeholder="Enter ingredients"
            onChange={props.handleChange}
        />
    </FormGroup>
    <FormGroup>
        <Label for="preparation">Preparation</Label>
        <Input
            type="textarea"
            name="preparation"
            placeholder="Enter preparation"
            onChange={props.handleChange}
        />
    </FormGroup>
    <FormGroup>
        <Label for="category">Category</Label>
        <Input
            type="select"
            name="category"
            onChange={props.handleChange}
        >
            {categories}
        </Input>
    </FormGroup>

    <Button color="primary" type="submit">Create</Button>
    </Form>
    </React.Fragment>
    );
}
export default CreateForm;