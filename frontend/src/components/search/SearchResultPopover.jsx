import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class CustomListGroupItem extends ListGroupItem {
  renderHeader(header, headingClassName) {
    return (
      <h4 className={headingClassName}>
        <div dangerouslySetInnerHTML={{ __html: header }} />
      </h4>
    );
  }
}

class SearchResultPopover extends Component {
  constructor(className, style) {
    super();
    this.className = className;
    this.style = style;
  }

  handleClick = (id, e) => {
    this.props.history.push(`/articles/${id}`);
    this.props.handleToggle();
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
              <CustomListGroupItem
                key={searchResult.id}
                href="#"
                header={searchResult.title}
                onClick={e => this.handleClick(searchResult.id, e)}
              >
                <span
                  dangerouslySetInnerHTML={{ __html: searchResult.headline }}
                />
              </CustomListGroupItem>
            ))}
        </ListGroup>
      </div>
    );
  }
}

export default withRouter(SearchResultPopover);
