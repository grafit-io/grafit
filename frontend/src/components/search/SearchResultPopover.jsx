import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default class SearchResultPopover extends Component {
  constructor(className, style) {
    super();
    this.className = className;
    this.style = style;
  }

  state = {
    searchResults: [
      {
        id: 31,
        title: "The Marketing Behind MongoDB",
        headline:
          "<strong>MongoDB</strong>’s success among startups was because some didn't critically assess 10gen’s <b>marketing</b>",
        rank: "0.61"
      },
      {
        id: 2,
        title: "MongoDB",
        rank: "0.37"
      },
      {
        id: 32,
        title:
          "Countless NoSQL databases competed to be the database of choice",
        rank: "0.36"
      },
      {
        id: 25,
        title: "Death By Database",
        rank: "0.12"
      }
    ]
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
          {this.state.searchResults &&
            this.state.searchResults.map(searchResult => (
              <ListGroupItem href="#" header={searchResult.title}>
                {searchResult.headline}
              </ListGroupItem>
            ))}
        </ListGroup>
      </div>
    );
  }
}
