import React, { Component } from 'react';
import Loading from '../layout/Loading';
import { ListGroup, ListGroupItem, UncontrolledCollapse, Button } from 'reactstrap';
import FullRecipe from './FullRecipe';
import {getData} from '../api-calls/api-calls';
import {RECIPE_GET} from '../constants/Constants';

class Category extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            recipes: []
        }
    }

    componentDidMount(){
        getData(RECIPE_GET + '?category=' + this.props.id)
        .then(json => {
            this.setState({
                recipes: json,
                isLoading: false
            });
        })
        .catch(console.log);
    }

    render() {
        const {isLoading, recipes} = this.state;

        if (isLoading) {
            return(<Loading />);
        }
        else {
            return (
                <ListGroup>
                {
                recipes.map(recipe =>
                    <div key={recipe.id}>
                        <ListGroupItem>
                            <Button outline id={'toggle' + recipe.id} className="rounded-circle mr-3 home-btn">
                            +
                            </Button>
                            {recipe.title}
                        </ListGroupItem>
                        <UncontrolledCollapse toggler={'#toggle' + recipe.id}>
                            <FullRecipe recipe={recipe}/>
                        </UncontrolledCollapse>
                    </div>
                )}
                </ListGroup>
            );
        }
    }
}

export default Category;