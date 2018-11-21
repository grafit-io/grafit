import React, { Component } from "react";
import {
  Glyphicon,
  FormGroup,
  InputGroup,
  Button,
  FormControl
} from "react-bootstrap";

export default class Searchbar extends Component {
  render() {
    if (!this.props.auth.isAuthenticated) {
      return null;
    }
    return (
      <div>
        <FormGroup>
          <InputGroup bsSize="large">
            <FormControl type="search" placeholder="search..." />
            <InputGroup.Button>
              <Button>
                <Glyphicon glyph="search" />
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </div>
    );
  }
}
