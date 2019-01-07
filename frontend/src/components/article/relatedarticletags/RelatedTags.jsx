import { WithContext as ReactTags } from "react-tag-input";
import React, { Component } from "react";
import "./style.css";
import { APIService } from "../../../services/APIService";
import { withRouter } from "react-router-dom";

class RelatedTags extends Component {
  state = {
    suggestions: []
  };

  componentDidMount() {
    APIService.getArticleTitles().then(titles =>
      this.setState({
        suggestions: titles
          .filter(
            el =>
              el.workspace === this.props.currentWorkspace ||
              el.id === this.props.currentArticle.id
          )
          .map(el => {
            return { id: String(el.id), title: el.title };
          })
      })
    );
  }

  deleteRelated = relatedArticleId => {
    APIService.deleteRelated(this.props.currentArticle.id, relatedArticleId);
    this.props.removeRelated(relatedArticleId);
  };

  handleDelete = i => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      this.deleteRelated(this.props.relatedArticles[i].id);
    }
  };

  handleAddition = tag => {
    console.log(tag);

    var label;
    var input = prompt("Please enter a label for this connection:", "Author");
    if (input === null || input === "") {
      label = "";
    } else {
      label = input;
    }

    // check if duplicate tag
    if (
      !this.props.relatedArticles.find(article => article.title === tag.title)
    ) {
      // check if article exists
      if (!this.state.suggestions.includes(tag)) {
        // create article
        APIService.createArticle(
          tag.title,
          "",
          this.props.currentWorkspace
        ).then(relatedArticle => {
          APIService.addRelated(
            this.props.currentArticle.id,
            relatedArticle.id,
            label
          );
          this.props.addRelated({
            id: relatedArticle.id,
            title: relatedArticle.title,
            label: label
          });
        });
      } else {
        APIService.getArticle(tag.id).then(relatedArticle => {
          APIService.addRelated(
            this.props.currentArticle.id,
            relatedArticle.id,
            label
          );
          this.props.addRelated({
            id: relatedArticle.id,
            title: relatedArticle.title,
            label: label
          });
        });
      }
    }
  };

  handleTagClick = id => {
    let existingLabel = this.props.relatedArticles[id].label;
    if (existingLabel === null) {
      existingLabel = "New Label";
    }

    let label;
    let input = prompt(
      "Please enter a new label for this connection:",
      existingLabel
    );
    if (input === null || input === "") {
      label = "";
    } else {
      label = input;
      const artilceId = this.props.currentArticle.id;
      const relatedArticleId = this.props.relatedArticles[id].id;

      console.log(
        `adding new labelname ${label} to existing connection between ${relatedArticleId} and ${artilceId}`
      );

      APIService.addRelated(artilceId, relatedArticleId, label);
      this.props.updateRelated({
        id: this.props.relatedArticles[id].id,
        title: this.props.relatedArticles[id].title,
        label: label
      });
    }
  };

  render() {
    return (
      <div>
        <ReactTags
          tags={this.props.relatedArticles.map(relatedArticle => {
            let label = relatedArticle.label;
            if (label === null) {
              label = "unlabeled";
            }
            return {
              id: String(relatedArticle.id),
              title: label + ": " + relatedArticle.title
            };
          })}
          suggestions={this.state.suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          autocomplete
          allowDragDrop={false}
          minQueryLength={1}
          handleTagClick={this.handleTagClick}
          labelField={"title"}
          autofocus={false}
        />
      </div>
    );
  }
}

export default withRouter(RelatedTags);
