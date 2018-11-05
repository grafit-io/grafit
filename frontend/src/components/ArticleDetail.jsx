import React, { Component } from "react";
import { Link } from "react-router-dom";
import { APIService } from "../services/APIService"
import { AuthService } from "../services/AuthService"

class ArticleDetail extends Component {

    state = {
        article: undefined
    }

    loadArticle = articleId => {
        if (AuthService.isLoggedIn()) {
            APIService.getArticle(articleId).then(article => {
                this.setState({ article: article })
            })
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
        return (
            <div>
                {this.state.article && (
                    <div>
                        <hr />
                        <h2>Detail View: {this.state.article.title}</h2>
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
            </div>
        )
    }
}

export default ArticleDetail