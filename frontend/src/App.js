import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import Login from "./components/login/Login"
import Nagivation from "./components/navigation/Navigation"
import { APIService } from "./services/APIService"
import { AuthService } from "./services/AuthService"
import "./App.css";


class App extends Component {
  state = {
    isAuthenticated: false,
    articles: [],
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  componentWillMount() {
    if (AuthService.isLoggedIn()) {
      this.setState({ isAuthenticated: true })
      APIService.getArticles().then(articles => {
        this.setState({ articles: articles })
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isAuthenticated === false && this.state.isAuthenticated === true) {
      APIService.getArticles().then(articles => this.setState({ articles: articles }))
    }
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
    }

    return (
      <Router>
        <div className="container">

          <Nagivation auth={authProps} />

          <div className="contentwrap">
            <Switch>
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
              {!this.state.isAuthenticated && (
                <Redirect push to='/login' />
              )}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
