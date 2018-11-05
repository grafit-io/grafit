import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import Login from "./components/login/Login"
import Nagivation from "./components/navigation/Navigation"
import "./App.css";


let BASE_URL = window.location.toString()

if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === "0.0.0.0") {
  BASE_URL = 'http://' + window.location.hostname + ':8000/'
}

const API = BASE_URL + 'api/v1/'
const AUTH_API = BASE_URL + 'api-token-auth/'
const DEFAULT_QUERY = "articles/"

class App extends Component {
  state = {
    isAuthenticated: false,
    authToken: undefined,
    articles: [],
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
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

    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      authToken: this.state.authToken,
      userHasAuthenticated: this.userHasAuthenticated,
    }

    return (
      <Router>
        <div className="container">

          <Nagivation auth={authProps} />

          {!this.state.isAuthenticated && (
            <Redirect push to='/login' />
          )}

          <div className="contentwrap">
            <Route path="/login" render={() => <Login auth={authProps} />} />
            {this.state.articles && this.state.isAuthenticated && (
              <Route exact path="/" render={() => (
                <ArticleList articles={this.state.articles} />)} />
            )}
            {this.state.articles && this.state.isAuthenticated && (
              <Route path="/articles/:articleId" render={({ match }) => {
                return <ArticleDetail article={this.state.articles.find(a => a.id === parseInt(match.params.articleId))} />
              }} />
            )}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
