import React, { Component, Fragment } from "react";
import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from "react-bootstrap";
import { APIService } from "../../../services/APIService";

export default class ArticleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { article: props.article, titles: [] };
  }

  componentDidMount() {
    APIService.getArticleTitles().then(titles =>
      this.setState({
        titles: titles
          .filter(
            el =>
              el.workspace === this.props.currentWorkspace &&
              el.id !== this.state.article.id
          )
          .map(el => el.title)
      })
    );
  }

  handleChange = evt => {
    const editArticle = Object.assign({}, this.state.article);
    editArticle[evt.target.name] = evt.target.value;
    this.setState({ article: editArticle });
  };

  getValidationState = () => {
    if (
      this.state.article.title.length > 3 &&
      !this.state.titles.includes(this.state.article.title)
    ) {
      return "success";
    } else {
      return "error";
    }
  };

  handleSubmit = () => {
    console.log("handle submit");
  };

  render() {
    const disableSubmit = this.getValidationState() !== "success";
    return (
      <Fragment>
        {this.state.article && (
          <div>
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
                onClick={this.handleSubmit}
                bsStyle="success"
              >
                Save
              </Button>
            </form>
          </div>
        )}
      </Fragment>
    );
  }
}
