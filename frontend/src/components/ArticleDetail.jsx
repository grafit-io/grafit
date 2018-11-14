import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { APIService } from "../services/APIService";
import {
  Alert,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
  ButtonToolbar
} from "react-bootstrap";

class ArticleDetail extends Component {
  state = {
    article: {
      title: "",
      text: "",
      related: []
    },
    edit: false,
    new: false,
    alertSuccess: false,
    redirectDeleted: false
  };

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
      this.setState({ redirectDeleted: true });
    });
  };

  handlePostSubmit = () => {
    APIService.createArticle(
      this.state.article.title,
      this.state.article.text,
      this.props.currentWorkspace
    )
      .then(article => {
        this.props.history.push("/articles/" + article.id);
        this.setState({ new: false, alertSuccess: true });
      })
      .catch(console.log);
  };

  handlePutSubmit = () => {
    APIService.updateArticle(
      this.props.match.params.articleId,
      this.state.article.title,
      this.state.article.text
    )
      .then(() => {
        this.setState({ alertSuccess: true, edit: false });
      })
      .catch(console.log);
  };

  handleChange = evt => {
    const editArticle = Object.assign({}, this.state.article);
    editArticle[evt.target.name] = evt.target.value;
    this.setState({ article: editArticle });
  };

  getValidationState = () => {
    if (this.state.article.title.length > 3) {
      return "success";
    } else {
      return "error";
    }
  };

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

    const disableSubmit = this.getValidationState() !== "success";
    if (this.state.edit) {
      return (
        <Fragment>
          {this.state.article && (
            <div>
              <hr />
              <h2>Edit Article: {this.state.article.title}</h2>
              <form>
                <FormGroup
                  controlId="articleEditForm"
                  validationState={this.getValidationState()}
                >
                  <ControlLabel>Article Title</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.article.title}
                    placeholder="Enter Title"
                    onChange={this.handleChange}
                    name="title"
                  />
                  <FormControl.Feedback />
                  <HelpBlock>Title has to be at least 4 characters.</HelpBlock>

                  <ControlLabel>Article Text</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    placeholder="Enter Text"
                    value={this.state.article.text}
                    onChange={this.handleChange}
                    name="text"
                    rows={14}
                  />
                </FormGroup>
                <Button
                  className="pull-right"
                  disabled={disableSubmit}
                  onClick={this.handlePutSubmit}
                  bsStyle="success"
                >
                  Save
                </Button>
              </form>
            </div>
          )}
        </Fragment>
      );
    } else if (this.state.new) {
      return (
        <Fragment>
          <div>
            <hr />
            <h2>New Article: {this.state.article.title}</h2>
            <form>
              <FormGroup
                controlId="articleEditForm"
                validationState={this.getValidationState()}
              >
                <ControlLabel>Article Title</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.article.title}
                  placeholder="Enter Title"
                  onChange={this.handleChange}
                  name="title"
                />
                <FormControl.Feedback />
                <HelpBlock>Title has to be at least 4 characters.</HelpBlock>

                <ControlLabel>Article Text</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  placeholder="Enter Text"
                  value={this.state.article.text}
                  onChange={this.handleChange}
                  name="text"
                  rows={14}
                />
              </FormGroup>
              <Button
                className="pull-right"
                disabled={disableSubmit}
                onClick={this.handlePostSubmit}
                bsStyle="success"
              >
                Save
              </Button>
            </form>
          </div>
        </Fragment>
      );
    } else {
      return (
        <div>
          <hr />
          {this.state.alertSuccess && <Alert bsStyle="success">Saved</Alert>}
          {this.state.article && (
            <div>
              <h2>Detail View: {this.state.article.title}</h2>
              <ButtonToolbar>
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
              <br />
              {this.state.article.related.map(relatedArticle => (
                <Link
                  to={`/articles/${relatedArticle.id}`}
                  key={relatedArticle.id}
                >
                  <span className="badge badge-info">
                    {relatedArticle.title}
                  </span>
                </Link>
              ))}
              <p>{this.state.article.text}</p>
            </div>
          )}
        </div>
      );
    }
  }
}

export default ArticleDetail;
