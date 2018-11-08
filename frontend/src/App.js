import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import Login from "./components/login/Login"
import Nagivation from "./components/navigation/Navigation"
import { AuthService } from "./services/AuthService"
import "./App.css";


class App extends Component {
  state = {
    isAuthenticated: false,
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  componentWillMount() {
    AuthService.isLoggedIn().then(loggedIn => this.setState({isAuthenticated: loggedIn}))
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
              {!this.state.isAuthenticated && (
                <Redirect push to='/login' />
              )}
              <Route exact path="/" component={ArticleList} />
              <Route path="/articles/:articleId" component={ArticleDetail} />
              )}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
