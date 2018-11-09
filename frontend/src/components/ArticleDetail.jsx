import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { APIService } from "../services/APIService"
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from "react-bootstrap"

class ArticleDetail extends Component {

    state = {
        article: undefined,
        edit: false,
    }

    loadArticle = articleId => {
        APIService.getArticle(articleId).then(article => {
            this.setState({ article: article })
        })
    }

    handleClick = () => {
        this.setState({ edit: true })
    }

    handleSubmit = () => {
        // TODO
    }

    handleChange = evt => {
        const editArticle = Object.assign({}, this.state.article);
        editArticle[evt.target.name] = evt.target.value
        this.setState({ article: editArticle })
    }

    getValidationState = () => {
        const titleLength = this.state.article.title.length
        const textLength = this.state.article.text.length

        if (titleLength > 3 && textLength > 0) {
            return 'success'
        } else {
            return 'error'
        }
    }

    componentDidMount() {
        this.loadArticle(this.props.match.params.articleId)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            if (nextProps.match.params.articleId !== this.props.match.params.articleId) {
                this.loadArticle(nextProps.match.params.articleId)
            }
        }
    }

    render() {
        if (this.state.edit) {
            const disableSubmit = this.getValidationState() !== 'success'
            return (
                <Fragment>
                    {this.state.article && (
                        <div>
                            <hr />
                            <h2>Edit Article: {this.state.article.title}</h2>
                            <form>
                                <FormGroup
                                    controlId="articleEditForm"
                                    validationState={this.getValidationState()}>
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
                                <Button className="pull-right" disabled={disableSubmit} onClick={this.handleSubmit} bsStyle="success" pullRight>Save</Button>
                            </form>
                        </div>
                    )}
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    {this.state.article && (
                        <div>
                            <hr />
                            <h2>Detail View: {this.state.article.title}</h2>
                            <Button bsStyle="primary" onClick={this.handleClick}>Edit</Button><br />
                            {this.state.article.related.map(relatedArticle => (
                                <Link to={`/articles/${relatedArticle.id}`}>
                                    <span className="badge badge-info" key={relatedArticle.id}>
                                        {relatedArticle.title}
                                    </span>
                                </Link>
                            ))}
                            <p>{this.state.article.text}</p>
                        </div>
                    )}
                </Fragment>
            )
        }
    }
}

export default ArticleDetail