import React, { Component, Fragment } from "react";
import { Alert } from "react-bootstrap";

export default class AlertSnack extends Component {
  render() {
    return (
      <Fragment>
        {this.props.alerts.map(alert => (
          <Alert bsStyle="success" key={alert.title}>
            <strong>{alert.title}</strong>
            <br />
            {alert.message}
          </Alert>
        ))}
      </Fragment>
    );
  }
}
