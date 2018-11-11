import React, { Component } from "react";
import "./Workspace.css";

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
                  <button
                    title={workspace.name}
                    className="btn-primary-invert btn btn-primary btn-block"
                  >
                    {workspace.initials}
                  </button>
                </li>
              ))}
        </ul>
      </div>
    );
  }
}
