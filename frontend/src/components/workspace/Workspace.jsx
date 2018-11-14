import React, { Component } from "react";
import "./Workspace.css";
import { Button } from "react-bootstrap";
import { APIService } from "../../services/APIService";

export default class Workspace extends Component {
  state = {
    workspaces: [],
    activeWorkspaceId: 1
  };

  loadWorkspaces = () => {
    APIService.getWorkspaces()
      .then(workspaces => {
        this.setState({ workspaces: workspaces });
        // set first workspace active
        this.props.changeWorkspace(workspaces[0].id);
      })
      .catch(console.log);
  };

  handleWorkspaceClick(workspace) {
    this.props.changeWorkspace(workspace);
    this.setState({ activeWorkspaceId: workspace });
  }

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
                  <Button
                    title={workspace.name}
                    className={
                      workspace.id === this.state.activeWorkspaceId
                        ? "active"
                        : ""
                    }
                    bsSize="primary"
                    onClick={event => {
                      event.preventDefault();
                      this.handleWorkspaceClick(workspace.id);
                    }}
                    block
                  >
                    {workspace.initials}
                  </Button>
                </li>
              ))}
        </ul>
      </div>
    );
  }
}
