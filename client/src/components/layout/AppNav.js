import React, { useState } from 'react';
import {Nav, Navbar, NavItem, NavbarBrand, NavLink, NavbarText, NavbarToggler, Collapse} from 'reactstrap';
import Logout from '../auth/Logout.js';
import AuthContext from '../auth/AuthContext';

const showItem = (isLoggedIn) => {
  if (isLoggedIn) {
    return (<React.Fragment>
    <NavItem>
      <NavLink href="/create">Create</NavLink>
    </NavItem>
    <NavItem>
      <Logout></Logout>
    </NavItem>
    </React.Fragment>);
  }
  else {
    return (<React.Fragment>
    <NavItem>
      <NavLink href="/register">Sign up</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="/login">Log in</NavLink>
    </NavItem>
    </React.Fragment>);
  }
}
  const AppNav = () => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    return(
    <AuthContext.Consumer>
      { context => (
        <Navbar color="dark" dark expand="md" className="sticky-top">
            <NavbarBrand href="/">
              <img src="favicon.png" alt="favicon" className="pr-2"/>
              Recipe Repository
            </NavbarBrand>
            <NavbarText className="d-none d-md-block">Save your favorite recipes in one place!</NavbarText>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse isOpen={!collapsed} navbar>
            <Nav className="ml-auto text-center" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              {
                showItem(context.isLoggedIn)
              }
            </Nav>
            </Collapse>
          </Navbar>
      )}
    </AuthContext.Consumer>
  );
}

export default AppNav;