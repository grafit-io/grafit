import React, { Component } from "react";
import { Link } from "react-router-dom";
import { APIService } from "../services/APIService";
import { Button } from "react-bootstrap";

class ArticleList extends Component {
  state = {
    articles: [],
    deletedId: undefined,
    offset: 0,
    loadMore: false
  };

  loadArticles = () => {
    APIService.getArticles(this.state.offset)
      .then(response => {
        this.setState({
          offset: this.state.offset + response.results.length,
          articles: this.state.articles.concat(response.results)
        });
        if (this.state.offset < response.count) {
          this.setState({ loadMore: true });
        } else {
          this.setState({ loadMore: false });
        }
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
      }
    }
  }

  render() {
    return (
      <div>
        <Link to={{ pathname: "/articles/new", state: { new: true } }}>
          <Button bsStyle="default" onClick={this.handleClick}>
            Create New Article
          </Button>
        </Link>
        <br />
        {this.state.articles &&
          this.state.articles
            .filter(
              article =>
                article.text !== "" &&
                article.workspace === this.props.currentWorkspace
            )
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
                <p>{article.shorttext}</p>
              </div>
            ))}
        {this.state.loadMore && (
          <Button bsStyle="default" onClick={this.loadArticles}>
            Load More
          </Button>
        )}
      </div>
    );
  }
}

export default ArticleList;
