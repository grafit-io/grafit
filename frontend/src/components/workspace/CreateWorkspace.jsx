import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button
} from "react-bootstrap";
import { APIService } from "../../services/APIService";

class CreateWorkspace extends Component {
  state = {
    workspace: {
      name: "",
      initials: ""
    },
    userInitials: false
  };

  getValidationState = () => {
    if (
      this.state.workspace.name.length >= 4 &&
      this.state.workspace.initials.length === 2
    ) {
      return "success";
    } else {
      return "warning";
    }
  };

  handleChange = evt => {
    if (evt.target.name === "initials" && !this.state.userInitials) {
      this.setState({ userInitials: true });
    }
    const editWorkspace = Object.assign({}, this.state.workspace);
    if (evt.target.name === "name" && !this.state.userInitials) {
      const nameParts = evt.target.value.split(" ");
      if (nameParts.length >= 2 && nameParts[1].length >= 1) {
        editWorkspace.initials = nameParts
          .slice(0, 2)
          .map(namePart => namePart.charAt(0).toUpperCase())
          .reduce((a, b) => a + b);
      } else {
        editWorkspace.initials = evt.target.value.substring(0, 2).toUpperCase();
      }
    }
    editWorkspace[evt.target.name] = evt.target.value;
    this.setState({ workspace: editWorkspace });
  };

  handleSubmit = () => {
    APIService.createWorkspace(
      this.state.workspace.name,
      this.state.workspace.initials
    )
      .then(() => {
        this.props.createAlert(
          this.state.workspace.initials,
          `Workspace ${this.state.workspace.name} created`
        );
        this.props.refreshWorkspaces();
        this.props.history.push("/");
      })
      .catch(console.log);
  };

  render() {
    const disableSubmit = this.getValidationState() !== "success";
    return (
      <div>
        <h2>Create Workspace</h2>
        <form
          style={{
            maxWidth: 450,
            margin: "0 auto"
          }}
        >
          <FormGroup
            controlId="workspaceCreateForm"
            validationState={this.getValidationState()}
          >
            <ControlLabel>Workspace Name</ControlLabel>
            <FormControl
              type="text"
              value={this.state.workspace.name}
              placeholder="Enter Name"
              onChange={this.handleChange}
              name="name"
            />
            <FormControl.Feedback />
            <HelpBlock>Name has to be at least 4 characters.</HelpBlock>

            <ControlLabel>Workspace Initials</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Initials"
              value={this.state.workspace.initials}
              onChange={this.handleChange}
              name="initials"
            />
            <FormControl.Feedback />
            <HelpBlock>Initials need to be exactly two characters.</HelpBlock>
          </FormGroup>
          <Button
            className="pull-right"
            disabled={disableSubmit}
            onClick={this.handleSubmit}
            bsStyle="success"
          >
            Save
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(CreateWorkspace);
