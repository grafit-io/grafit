import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { AuthService } from "../../services/AuthService";

class Navigation extends Component {
  handleLogout = event => {
    this.props.auth.userHasAuthenticated(false);
    AuthService.logout();
  };

  render() {
    if (this.props.auth.isAuthenticated) {
      return null;
    }

    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">grafit.io</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Fragment>
            <Nav pullRight>
              <NavItem eventKey={2} href="/signup">
                Signup
              </NavItem>
              <NavItem eventKey={2} href="/login">
                Login
              </NavItem>
            </Nav>
          </Fragment>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
