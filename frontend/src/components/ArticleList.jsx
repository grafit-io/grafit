import React, { Component } from "react";
import { Link } from "react-router-dom";
import { APIService } from "../services/APIService"
import { AuthService } from "../services/AuthService"

class ArticleList extends Component {

  state = {
    articles: [],
  }

  componentDidMount() {
    if (AuthService.isLoggedIn()) {
      APIService.getArticles().then(articles => {
        this.setState({ articles: articles })
      })
    }
  }

  render() {
    return (
      <div>
        {this.state.articles.filter(article => article.text !== "").map(article => (
          <div key={article.id}>
            <hr />
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
        ))}
      </div>
    );
  }
}

export default ArticleList;