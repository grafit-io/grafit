import React, { Component } from "react";
import { Glyphicon, Dropdown, MenuItem } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { AuthService } from "../../services/AuthService";

class UserDropdown extends Component {
  handleLogout = event => {
    this.props.history.push("/");
    this.props.auth.userHasAuthenticated(false);
    AuthService.logout();
  };

  handleDropDownClick() {
    this.dropDownFixPosition(
      document.getElementById("user-dropdown"),
      document.getElementById("user-dropdown-menu")
    );
  }

  dropDownFixPosition(button, dropdown) {
    var rect = button.getBoundingClientRect();

    var offset = {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    };

    var dropDownTop = offset.top + button.offsetHeight;

    dropdown.style.top = dropDownTop + "px";
    dropdown.style.left = offset.left + "px";
  }

  render() {
    return (
      <Dropdown id="user-dropdown">
        <Dropdown.Toggle
          bsStyle="primary"
          noCaret
          id="user-dropdown-btn"
          onClick={event => {
            event.preventDefault();
            this.handleDropDownClick();
          }}
        >
          <Glyphicon glyph="user" />
        </Dropdown.Toggle>
        <Dropdown.Menu id="user-dropdown-menu">
          <MenuItem eventKey="1" disabled>
            Settings
          </MenuItem>
          <MenuItem eventKey="2" disabled>
            Account
          </MenuItem>
          <MenuItem divider />
          <MenuItem
            eventKey="3"
            onClick={event => {
              event.preventDefault();
              this.handleLogout();
            }}
          >
            Logout
          </MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default withRouter(UserDropdown);
