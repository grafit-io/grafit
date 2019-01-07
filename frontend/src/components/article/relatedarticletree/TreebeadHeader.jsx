import React from "react";
import { withRouter } from "react-router-dom";

class Header extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(nodeId, e) {
    e.stopPropagation();
    if (nodeId) {
      this.props.history.push(`/articles/${nodeId}`);
    }
  }

  render() {
    const { node, style } = this.props;

    return (
      <div style={style.base}>
        {!node.label && (
          <div
            style={{ ...style.title, cursor: "pointer" }}
            onClick={e => this.handleClick(node.id, e)}
          >
            {node.name}
          </div>
        )}
        {node.label && (
          <div>
            <i>
              <b>{node.name}</b>
            </i>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Header);
