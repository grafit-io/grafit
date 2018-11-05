import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";

class Navigation extends Component {

    handleLogout = event => {
        this.props.auth.userHasAuthenticated(false)
    }

    render() {
        return (
            <Navbar inverse fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">
                            grafit.io
          </Link>
                    </Navbar.Brand>
                </Navbar.Header>
                {this.props.auth.isAuthenticated
                    ? <Fragment>
                        <Nav>
                            <NavItem eventKey={1} href="/">Articles</NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem onClick={this.handleLogout}>Logout</NavItem>
                        </Nav>
                    </Fragment>
                    : <Fragment>
                        <Nav pullRight>
                            <NavItem eventKey={2} href="/signup">Signup</NavItem>
                            <NavItem eventKey={2} href="/login">Login</NavItem>
                        </Nav>
                    </Fragment>
                }
            </Navbar>
        )
    }
}

export default Navigation

