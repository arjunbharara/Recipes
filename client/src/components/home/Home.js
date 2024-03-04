import React, {Component} from 'react';
import Category from './Category';
import Loading from '../layout/Loading';
import {getData} from '../api-calls/api-calls';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import { CATEGORY_GET } from '../constants/Constants';

class Home extends Component {

    state = {
        isLoading: true,
        categories: [],
        activeTab: 1
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

    toggle(tab) {
        if(this.state.activeTab !== tab) {
            this.setState({activeTab: tab});
        }
    }

    render() {
        const {isLoading, categories, activeTab} = this.state;

        if (isLoading) {
            return (<Loading />);
        }
        else {
            return (
                <div className="bg-dark p-3 rounded">
                    <Nav tabs className="nav-pills">
                    {
                    categories.map(category =>
                        <NavItem key={category.id} className="bg-light">
                            <NavLink
                                className={category.id === activeTab ? 'active' : ''}
                                onClick={() => {
                                    this.toggle(category.id);
                            }}>
                                {category.name}
                            </NavLink>
                        </NavItem>
                    )}
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        {categories.map(category =>
                            <TabPane tabId={category.id} key={category.id}>
                                <Category id={category.id}/>
                            </TabPane>
                        )}
                    </TabContent>
                </div>
            );
        }
    }

}

export default Home;
