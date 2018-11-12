import React, { Component } from "react";
import "./Workspace.css";
import { Button } from "react-bootstrap";
import { APIService } from "../../services/APIService";

export default class Workspace extends Component {
  state = {
    workspaces: []
  };

  loadWorkspaces = () => {
    APIService.getWorkspaces()
      .then(workspaces => {
        this.setState({ workspaces: workspaces });
      })
      .catch(console.log);
  };

  componentDidMount() {
    this.loadWorkspaces();
  }

  render() {
    if (
      !this.props.auth.isAuthenticated ||
      !this.state.workspaces ||
      !this.state.workspaces.length
    ) {
      return null;
    }
    return (
      <div id="sidebar" className="sidebar-offcanvas">
        <ul className="nav nav-pills nav-stacked">
          {this.state.workspaces &&
            this.state.workspaces
              .filter(workspace => workspace.initials !== "")
              .map(workspace => (
                <li key={workspace.id}>
                  <Button title={workspace.name} bsSize="primary" block>
                    {workspace.initials}
                  </Button>
                </li>
              ))}
        </ul>
      </div>
    );
  }
}
