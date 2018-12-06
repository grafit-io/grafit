import React, { Component } from "react";
import { APIService } from "../../../services/APIService";
import { Treebeard, decorators } from "react-treebeard";
import { TreeStyle } from "./treebeardstyles";
import Header from "./TreebeadHeader";

export default class RelatedArticleTree extends Component {
  state = {
    treebeardData: undefined
  };

  componentDidMount() {
    if (this.props.article && this.props.article.id) {
      this.setState({
        treebeardData: this.getTreebeardData(this.props.article)
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps &&
      nextProps.article &&
      nextProps.article.id &&
      nextProps.article.id !== this.props.article.id
    ) {
      this.setState({
        treebeardData: this.getTreebeardData(nextProps.article)
      });
    }
  }

  getTreebeardData = article => {
    return {
      id: article.id,
      name: article.title,
      toggled: true,
      children: article.related.map(related =>
        this.generateRelatedNode(related, 1)
      ),
      level: 0
    };
  };

  onToggle = (node, toggled) => {
    if (this.state.cursor) {
      this.setState({
        cursor: {
          active: false
        }
      });
    }
    if (node.loading) {
      APIService.getArticle(node.id)
        .then(article => {
          node.children = article.related.map(related =>
            this.generateRelatedNode(related, node.level + 1)
          );
          node.loading = false;
        })
        .then(() => {
          node.active = true;
          if (node.children) {
            node.toggled = toggled;
          }
          this.setState({ cursor: node });
        });
    } else {
      if (node.children) {
        node.toggled = toggled;
      }
    }
  };

  generateRelatedNode = (related, level) => {
    if (level > 5) {
      return {
        id: related.id,
        name: related.title
      };
    }
    return {
      id: related.id,
      name: related.title,
      loading: true,
      children: [],
      level: level
    };
  };

  render() {
    // set custom treebeard heade
    decorators.Header = Header;

    return (
      <div>
        <h3>Related Articles</h3>
        {this.state.treebeardData && (
          <Treebeard
            data={this.state.treebeardData}
            onToggle={this.onToggle}
            style={TreeStyle}
          />
        )}
      </div>
    );
  }
}
