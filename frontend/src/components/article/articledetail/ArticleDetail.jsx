import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { APIService } from "../../../services/APIService";
import { Button, ButtonToolbar } from "react-bootstrap";
import RelatedArticleTree from "../relatedarticletree/RelatedArticleTree";
import ArticleCreate from "./ArticleCreate";
import ArticleUpdate from "./ArticleUpdate";
import RelatedTags from "../relatedarticletags/RelatedTags";

class ArticleDetail extends Component {
  state = {
    article: {
      title: "",
      text: "",
      related: []
    },
    edit: false,
    new: false,
    redirectDeleted: false
  };

  constructor(props) {
    super(props);
    this.setDefaultView = this.setDefaultView.bind(this);
    this.setArticle = this.setArticle.bind(this);
  }

  setDefaultView() {
    this.setState({ edit: false, new: false });
  }

  setArticle(article) {
    this.setState({ article: article });
  }

  componentDidMount() {
    if (this.props.location.state) {
      const isNew = this.props.location.state.new;
      if (isNew) {
        this.setState({ new: true });
      }
    } else {
      this.loadArticle(this.props.match.params.articleId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (
        nextProps.match.params.articleId !== this.props.match.params.articleId
      ) {
        this.loadArticle(nextProps.match.params.articleId);
      }
    }
  }

  loadArticle = articleId => {
    APIService.getArticle(articleId).then(article => {
      this.setState({ article: article });
    });
  };

  handleClick = () => {
    this.setState({ edit: true });
  };

  deleteItem = () => {
    APIService.deleteArticle(this.props.match.params.articleId).then(() => {
      this.props.createAlert(
        "Deleted Article",
        `Article ${this.state.article.title} was successfully deleted`
      );
      this.setState({ redirectDeleted: true });
    });
  };

  removeRelated = id => {
    let related = this.state.article.related.filter(
      related => related.id !== parseInt(id)
    );
    let article = { ...this.state.article };
    article.related = related;
    this.setState({ article });
  };

  addRelated = relatedArticle => {
    const related = [...this.state.article.related, relatedArticle];
    let article = { ...this.state.article };
    article.related = related;
    this.setState({ article });
  };

  render() {
    if (this.state.redirectDeleted) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { deletedId: this.props.match.params.articleId }
          }}
        />
      );
    }
    if (this.state.edit) {
      return (
        <ArticleUpdate
          article={this.state.article}
          currentWorkspace={this.props.currentWorkspace}
          createAlert={this.props.createAlert}
          setDefaultView={this.setDefaultView}
          setArticle={this.setArticle}
        />
      );
    } else if (this.state.new) {
      return (
        <ArticleCreate
          article={{ title: "", text: "", related: [] }}
          currentWorkspace={this.props.currentWorkspace}
          createAlert={this.props.createAlert}
          setDefaultView={this.setDefaultView}
          setArticle={this.setArticle}
        />
      );
    } else {
      return (
        <div>
          {this.state.article && (
            <div>
              <div>
                <h2 style={{ display: "inline-block" }}>
                  {this.state.article.title}
                </h2>

                <ButtonToolbar
                  style={{
                    float: "right"
                  }}
                >
                  <Button bsStyle="primary" onClick={this.handleClick}>
                    Edit
                  </Button>
                  <Button
                    bsStyle="danger"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete this item?"
                        )
                      )
                        this.deleteItem();
                    }}
                  >
                    Delete
                  </Button>
                </ButtonToolbar>
              </div>
              <RelatedTags
                currentWorkspace={this.props.currentWorkspace}
                currentArticle={this.state.article}
                relatedArticles={this.state.article.related}
                removeRelated={this.removeRelated}
                addRelated={this.addRelated}
              />
              <p>{this.state.article.text}</p>
              <RelatedArticleTree article={this.state.article} />
            </div>
          )}
        </div>
      );
    }
  }
}

export default ArticleDetail;
