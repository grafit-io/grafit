import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Glyphicon } from "react-bootstrap";
import { APIService } from "../../services/APIService";
import "./Workspace.css";

class Workspace extends Component {
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

  createWorkspace() {
    this.props.history.push("/createworkspace");
  }

  handleWorkspaceClick(workspace) {
    this.props.changeWorkspace(workspace);
    this.setState({ activeWorkspaceId: workspace });
  }

  componentDidMount() {
    this.loadWorkspaces();
  }

  componentWillReceiveProps(props) {
    if (props.refresh) {
      this.loadWorkspaces();
      this.props.refreshWorkspaces();
    }
  }

  render() {
    if (!this.props.auth.isAuthenticated) {
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
                    bsStyle="primary"
                    onClick={event => {
                      event.preventDefault();
                      this.props.history.push("/");
                      this.handleWorkspaceClick(workspace.id);
                    }}
                    block
                  >
                    {workspace.initials.toUpperCase()}
                  </Button>
                </li>
              ))}
          <Button
            bsStyle="primary"
            onClick={event => {
              event.preventDefault();
              this.createWorkspace();
            }}
          >
            <Glyphicon glyph="plus" />
          </Button>
        </ul>
      </div>
    );
  }
}

export default withRouter(Workspace);
