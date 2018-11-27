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
import { APIService } from "../../services/APIService";

export default class Searchbar extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleToggle = this.handleToggle.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      show: false,
      query: "",
      searchResults: []
    };
  }

  handleToggle() {
    if (!this.state.show) {
      this.setSearchResults(this.state.query);
    }
    this.setState({ show: !this.state.show });
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.setSearchResults(this.state.query);
      this.setState({ show: true });
    }
  }

  onChange(e) {
    this.setState({ query: e.target.value });
  }

  setSearchResults(query) {
    APIService.getSearchResults(query).then(results =>
      this.setState({ searchResults: results })
    );
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
            <FormControl
              type="search"
              placeholder="search..."
              onKeyPress={this.handleKeyPress}
              onChange={this.onChange}
            />
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
          <SearchResultPopover searchResults={this.state.searchResults} />
        </Overlay>
      </div>
    );
  }
}
