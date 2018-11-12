import React, { Component } from "react";
import { Link } from "react-router-dom";
import { APIService } from "../services/APIService";
import { Alert, Button } from "react-bootstrap";

class ArticleList extends Component {
  state = {
    articles: [],
    deletedId: undefined
  };

  loadArticles = () => {
    APIService.getArticles()
      .then(articles => {
        this.setState({ articles: articles });
      })
      .catch(console.log);
  };

  componentDidMount() {
    this.loadArticles();
    if (this.props.location.state) {
      if (this.props.location.state.deletedId) {
        const deletedId = this.props.location.state.deletedId;
        this.setState({
          articles: this.state.articles.filter(
            article => article.id !== parseInt(deletedId)
          ),
          deletedId: deletedId
        });
        this.props.location.state.deletedId = null;
        setTimeout(() => {
          this.setState({ deletedId: undefined });
        }, 5000);
      }
    }
  }

  render() {
    let deletedId = this.state.deletedId;
    return (
      <div>
        {deletedId && (
          <Alert bsStyle="success">Deleted Article {deletedId}</Alert>
        )}
        <Link to={{ pathname: "/articles/new", state: { new: true } }}>
          <Button bsStyle="default" onClick={this.handleClick}>
            Create New Article
          </Button>
        </Link>
        <br />
        {this.state.articles &&
          this.state.articles
            .filter(article => article.text !== "")
            .map(article => (
              <div key={article.id}>
                <Link to={`/articles/${article.id}`}>
                  <h2>{article.title}</h2>
                </Link>
                {article.related.map(related => (
                  <Link to={`/articles/${related.id}`} key={related.id}>
                    <span className="badge badge-info">{related.title}</span>
                  </Link>
                ))}
                <p>{article.text}</p>
              </div>
            ))}
      </div>
    );
  }
}

export default ArticleList;
