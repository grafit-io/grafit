import React, { Component } from "react";
import "./Workspace.css";
import { Button } from "react-bootstrap";

export default class Workspace extends Component {
  state = {
    workspaces: [
      {
        id: 1,
        initials: "PR",
        name: "Public Relations"
      },
      {
        id: 2,
        initials: "SW",
        name: "Software Engineering"
      }
    ]
  };

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
