import AuthContext from './AuthContext.js';
import React, {Component} from 'react';

function isLoggedIn() {
    if (localStorage.length === 0) {
        return false;
    }
    else {
        return true;
    }
}
class AuthProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: isLoggedIn()
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    };

    login(username, token) {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        this.setState({isLoggedIn: true});
    }
    logout() {
        localStorage.clear();
        this.setState({isLoggedIn: false});
    }

    render() {
        const value = {
            isLoggedIn: this.state.isLoggedIn,
            logout: this.logout,
            login: this.login
        }
        return (
            <AuthContext.Provider value={value}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}
export default AuthProvider;