import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import Login from "./components/login/Login";
import Nagivation from "./components/navigation/Navigation";
import Workspace from "./components/workspace/Workspace";
import WorkspaceToggle from "./components/workspace/WorkspaceToggle";
import { AuthService } from "./services/AuthService";
import "./App.css";
import Register from "./components/Register";

class App extends Component {
  state = {
    isAuthenticated: false,
    finishedLoading: false
  };

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  componentWillMount() {
    AuthService.isLoggedIn().then(loggedIn =>
      this.setState({
        finishedLoading: true,
        isAuthenticated: loggedIn
      })
    );
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      <Router>
        <div className="row-offcanvas row-offcanvas-left">
          <Nagivation auth={authProps} />

          <Workspace auth={authProps} />

          <div className="content">
            <WorkspaceToggle auth={authProps} />
            <Switch>
              <Route path="/login" render={() => <Login auth={authProps} />} />
              <Route path="/signup" component={Register} />
              {this.state.finishedLoading && !this.state.isAuthenticated && (
                <Redirect push to="/login" />
              )}
              <Route exact path="/" component={ArticleList} />
              <Route
                exact
                path="/articles/:articleId"
                component={ArticleDetail}
              />
              )}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
