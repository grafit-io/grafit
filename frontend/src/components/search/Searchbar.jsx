import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Glyphicon,
  FormGroup,
  InputGroup,
  Button,
  FormControl,
  Overlay
} from "react-bootstrap";
import SearchResultPopover from "./SearchResultPopover";
import "./Searchbar.css";

export default class Searchbar extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleToggle = this.handleToggle.bind(this);

    this.state = {
      show: false
    };
  }

  handleToggle() {
    this.setState({ show: !this.state.show });
  }

  render() {
    if (!this.props.auth.isAuthenticated) {
      return null;
    }
    return (
      <div style={{ height: 100, position: "relative" }}>
        <FormGroup>
          <InputGroup
            bsSize="large"
            className="searchbar"
            ref={button => {
              this.target = button;
            }}
          >
            <FormControl type="search" placeholder="search..." />
            <InputGroup.Button>
              <Button
                ref={button => {
                  this.target = button;
                }}
                onClick={this.handleToggle}
              >
                <Glyphicon glyph="search" />
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        <Overlay
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
          placement="bottom"
          container={this}
          target={() => ReactDOM.findDOMNode(this.target)}
          rootClose={true}
        >
          <SearchResultPopover />
        </Overlay>
      </div>
    );
  }
}
