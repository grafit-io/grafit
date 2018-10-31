import React, { Component } from "react";
import { Link } from "react-router-dom";

class ArticleDetail extends Component {

    render() {
        return (
            <div>
                {this.props.article && (
                    <div>
                        <hr />
                        <h2>Detail View: {this.props.article.title}</h2>
                        {this.props.article.related.map(relatedArticle => (
                            <Link to={`/articles/${relatedArticle.id}`}>
                                <span className="badge badge-info" key={relatedArticle.id}>
                                    {relatedArticle.title}
                                </span>
                            </Link>
                        ))}
                        <p>{this.props.article.text}</p>
                    </div>
                )}
            </div>
        )
    }
}

export default ArticleDetail