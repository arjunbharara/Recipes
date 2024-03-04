import React, {Component} from 'react';
import {Button} from 'reactstrap';
import AuthContext from './AuthContext';

class Logout extends Component {

    render() {
        return (
        <AuthContext.Consumer>
            {
                context =>
                {
                    if (context.isLoggedIn) {
                        return <Button color="secondary" onClick={context.logout}>Log out</Button>;
                    }
                }
            }
        </AuthContext.Consumer>
        );
    }
}
 
export default Logout;