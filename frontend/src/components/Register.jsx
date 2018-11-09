import React, { Component } from "react";
import {
  Alert,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { APIService } from "../services/APIService";

export default class Register extends Component {
  state = {
    username: "",
    password: "",
    password2: "",
    firstname: "",
    lastname: "",
    email: "",
    alert: false,
    created: false
  };

  validateForm() {
    return (
      this.state.username.length > 0 &&
      this.state.password.length > 0 &&
      this.state.firstname.length > 0 &&
      this.state.lastname.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password === this.state.password2
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    APIService.createUser(
      this.state.username,
      this.state.password,
      this.state.firstname,
      this.state.lastname,
      this.state.email
    )
      .then(() => {
        this.setState({ created: true });
      })
      .catch(reason => {
        console.log(reason);
        this.setState({ alert: true });
      });
  };

  render() {
    const redirect = this.state.created;
    if (redirect) {
      console.log("created user");
      return <Redirect push to="/login" />;
    }

    return (
      <div>
        <hr />
        <div className="Register">
          <form onSubmit={this.handleSubmit.bind(this)}>
            {this.state.alert && (
              <Alert bsStyle="warning">Could not create user</Alert>
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
            <FormGroup controlId="password2" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                value={this.state.password2}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <FormGroup controlId="firstname" bsSize="large">
              <ControlLabel>Firstname</ControlLabel>
              <FormControl
                autoFocus
                type="input"
                value={this.state.firstname}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="lastname" bsSize="large">
              <ControlLabel>Lastname</ControlLabel>
              <FormControl
                autoFocus
                type="input"
                value={this.state.lastname}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
