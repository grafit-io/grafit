import React, { Component } from "react";
import { APIService } from "../../../services/APIService";
import { Treebeard, decorators } from "react-treebeard";
import { TreeStyle } from "./treebeardstyles";
import Header from "./TreebeadHeader";

export default class RelatedArticleTree extends Component {
  state = {
    treebeardData: undefined
  };

  async componentDidMount() {
    if (this.props.article && this.props.article.id) {
      this.setState({
        treebeardData: await this.getTreebeardData(this.props.article)
      });
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (
      (nextProps &&
        nextProps.article &&
        nextProps.article.id &&
        nextProps.article.id !== this.props.article.id) ||
      nextProps.article.related !== this.props.article.related
    ) {
      this.setState({
        treebeardData: await this.getTreebeardData(nextProps.article)
      });
    }
  }

  getTreebeardData = async article => {
    let children = await Promise.all(
      article.related.map(async related => {
        let children = [];
        let relatedArticle = await APIService.getArticle(related.id);
        if (relatedArticle.related.length <= 1) {
          children = undefined;
        }
        return this.generateRelatedNode(related, [article.id], 1, children);
      })
    );

    return {
      parent: undefined,
      id: article.id,
      name: article.title,
      toggled: true,
      children: children,
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
          node.children = article.related.map(related => {
            let children = [];
            if (node.parents.includes(related.id)) {
              children = undefined;
            }
            return this.generateRelatedNode(
              related,
              [...node.parents, article.id],
              node.level + 1,
              children
            );
          });
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

  generateRelatedNode = (related, parents, level, children) => {
    if (!children || level > 5) {
      return {
        parents: parents,
        id: related.id,
        name: related.title
      };
    }
    return {
      parents: parents,
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
