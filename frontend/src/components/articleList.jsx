import React, { Component } from "react";

const API = 'http://localhost:8000/api/v1/'
const AUTH_API = 'http://localhost:8000/api-token-auth/'
const DEFAULT_QUERY = "articles/"

class ArticleList extends Component {
  state = {
    articles: []
  }

  componentDidMount() {

    fetch(AUTH_API,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ username: 'admin', password: 'admin' })
      })
      .then(response => response.json())
      .then(data => {
        let token = data['token']
        console.log(token)

        fetch(API + DEFAULT_QUERY, {
          headers: {
            'Authorization': 'Token ' + token
          }
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Something went wrong ...');
            }
          })
          .then(data => this.setState({ articles: data }))
          .catch(error => console.log(error));
      })
      .catch(function (res) { console.log(res) })
  }

  render() {
    return (
      <div>
        {this.state.articles.filter(article => article.text !== "").map(article => (
          <div key={article.id}>
            <hr />
            <h2>{article.title}</h2>
            {article.related.map(tag => (
              <a href={`/articles/${tag.id}`} >
                <span className="badge badge-info" key={tag.id}>
                  {tag.title}
                </span>
              </a>
            ))}
            <p>{article.text}</p>
          </div>
        ))}
      </div>
    );
  }
}
export default ArticleList;
