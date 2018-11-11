import React, { Component } from "react";

export default class WorkspaceToggle extends Component {
  handleWorkspaceToggle = event => {
    document.querySelector(".row-offcanvas").classList.toggle("active");
  };

  render() {
    if (!this.props.auth.isAuthenticated) {
      return null;
    }
    return (
      <p className="visible-xs">
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={this.handleWorkspaceToggle}
        >
          Show Workspaces
        </button>
      </p>
    );
  }
}
