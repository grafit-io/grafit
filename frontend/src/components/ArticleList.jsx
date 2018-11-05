import React, { Component } from "react";
import { Link } from "react-router-dom";

class ArticleList extends Component {
  render() {
    return (
      <div>
        {this.props.articles.filter(article => article.text !== "").map(article => (
          <div key={article.id}>
            <hr />
            <Link to={`/articles/${article.id}`}>
              <h2>{article.title}</h2>
            </Link>
            {article.related.map(article => (
              <Link to={`/articles/${article.id}`}>
                <span className="badge badge-info" key={article.id}>
                  {article.title}
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