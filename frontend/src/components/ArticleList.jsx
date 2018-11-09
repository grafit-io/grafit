import React, { Component } from "react";
import { Link } from "react-router-dom";
import { APIService } from "../services/APIService"
import { Button } from "react-bootstrap"

class ArticleList extends Component {

    state = {
        articles: [],
    }

    componentDidMount() {
        APIService.getArticles()
            .then(articles => {
                this.setState({ articles: articles })
            })
            .catch(console.log)
    }

    render() {
        return (
            <div>
                <hr />
                <Link to={{ pathname: "/articles/new", state: { new: true } }}>
                    <Button bsStyle="primary" onClick={this.handleClick}>
                        Create New Article
                    </Button>
                </Link>
                <br />
                {this.state.articles && this.state.articles.filter(article => article.text !== "").map(article => (
                    <div key={article.id}>
                        <Link to={`/articles/${article.id}`}>
                            <h2>{article.title}</h2>
                        </Link>
                        {article.related.map(related => (
                            <Link to={`/articles/${related.id}`}>
                                <span className="badge badge-info" key={related.id}>
                                    {related.title}
                                </span>
                            </Link>
                        ))}
                        <p>{article.text}</p>
                    </div>
                ))
                }
            </div >
        );
    }
}

export default ArticleList;