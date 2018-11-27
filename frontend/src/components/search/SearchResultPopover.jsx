import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default class SearchResultPopover extends Component {
  constructor(className, style) {
    super();
    this.className = className;
    this.style = style;
  }

  handleClick = id => {
    console.log(id);
  };

  render() {
    return (
      <div
        className={this.className}
        style={{
          ...this.style,
          position: "absolut",
          backgroundColor: "#EEE",
          boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
          border: "1px solid #CCC",
          borderTop: "0px",
          borderRadius: "0px 0px 3px 3px",
          marginLeft: 5,
          marginRight: 5,
          marginTop: -15,
          padding: 10,
          paddingBottom: 0
        }}
      >
        <ListGroup>
          {this.props.searchResults &&
            this.props.searchResults.map(searchResult => (
              <ListGroupItem
                key={searchResult.id}
                href="#"
                header={searchResult.title}
              >
                {searchResult.headline}
              </ListGroupItem>
            ))}
        </ListGroup>
      </div>
    );
  }
}
