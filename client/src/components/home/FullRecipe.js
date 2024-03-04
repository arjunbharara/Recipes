import React from 'react';
import {Card, CardBody, CardHeader, CardGroup, CardTitle} from 'reactstrap';

function splitText(text) {
    return text.split(/\r\n|\r|\n/g);
}
const FullRecipe = (props) => {

    const ingredients = splitText(props.recipe.ingredients);
    const preparation = splitText(props.recipe.preparation);

    return (
        <CardGroup>
            <Card style={{flexGrow: 1}}>
                <CardHeader>
                    <small className="text-muted">
                        By: {props.recipe.author.username}
                    </small>
                    <CardTitle tag="h5">Ingredients:</CardTitle>
                    <ul>
                        {
                            ingredients.map((element, index) =>
                                <li key={index}>{element}</li>
                            )
                        }
                    </ul>
                </CardHeader>
            </Card>
            <Card style={{flexGrow: 2, borderTop: '6px solid #e04006'}}>
                <CardBody>
                    <CardTitle tag="h5">Preparation:</CardTitle>
                    {
                        preparation.map((element, index) =>
                            <p key={index}>{element}</p>
                        )
                    }
                </CardBody>
            </Card>
      </CardGroup>
    );
}

export default FullRecipe;