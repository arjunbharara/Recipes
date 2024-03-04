import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import AppNav from './components/layout/AppNav';
import Footer from './components/layout/Footer';
import Home from './components/home/Home.js';
import Login from './components/auth/Login.js';
import Register from './components/auth/Register.js';
import Create from './components/create/Create.js';
import NotFound from './components/layout/NotFound.js';
import 'bootstrap/dist/css/bootstrap.css';
import {Container} from 'reactstrap';
import AuthProvider from './components/auth/AuthProvider.js';
import './App.css';

class App extends Component {
    routes = (
        <Switch>
            <Route path='/login' render={props => <Login location={props.location}/>}/>
            <Route path='/register' component={Register}/>
            <Route path='/create' component={Create}/>
            <Route path='/' exact={true} component={Home}/>
            <Route component={NotFound} />
        </Switch>
    );

    render() { 
        return ( 
            <AuthProvider>
                <Router>
                    <div className="wrapper">
                        <AppNav />
                        <Container className="py-4 main-container">
                            {this.routes}
                        </Container>
                        <Footer/>
                    </div>
                </Router>
            </AuthProvider>
         );
    }
}

export default App;