import React, { Component } from "react";
import {
  Alert,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Image
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      alert: false
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    AuthService.login(this.state.username, this.state.password)
      .then(() => {
        this.props.auth.userHasAuthenticated(true);
      })
      .catch(reason => {
        console.log(reason);
        this.setState({ alert: true });
      });
  };

  render() {
    const redirect = this.props.auth.isAuthenticated;
    if (redirect) {
      return <Redirect push to="/" />;
    }

    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Image src="logo_transparent.svg" />

          {this.state.alert && (
            <Alert bsStyle="warning">
              <h4>Invalid Credentials</h4>
              <p>Please verify your inputs.</p>
            </Alert>
          )}
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="input"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            bsStyle="primary"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
