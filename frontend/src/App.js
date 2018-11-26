import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/articledetail/ArticleDetail";
import Login from "./components/login/Login";
import Nagivation from "./components/navigation/Navigation";
import Workspace from "./components/workspace/Workspace";
import WorkspaceToggle from "./components/workspace/WorkspaceToggle";
import CreateWorkspace from "./components/workspace/CreateWorkspace";
import { AuthService } from "./services/AuthService";
import "./App.css";
import Register from "./components/Register";
import Searchbar from "./components/search/Searchbar";
import AlertSnack from "./components/AlertSnack";

class App extends Component {
  state = {
    isAuthenticated: false,
    finishedLoading: false,
    currentWorkspace: undefined,
    alerts: []
  };

  createAlert = (title, message, type = "success", duration = 5000) => {
    this.setState(prevState => ({
      alerts: [
        ...prevState.alerts,
        { title: title, message: message, type: type, duration: duration }
      ]
    }));
    // auto remove after duration
    setTimeout(() => {
      this.setState(prevState => ({
        alerts: prevState.alerts.filter(
          alert => alert.title !== title && alert.message !== message
        )
      }));
    }, duration);
  };

  handleWorkspaceChange = workspace => {
    this.setState({ currentWorkspace: workspace });
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

          <Workspace
            auth={authProps}
            changeWorkspace={this.handleWorkspaceChange}
          />

          <div className="content">
            <Searchbar auth={authProps} />
            <WorkspaceToggle auth={authProps} />
            <AlertSnack alerts={this.state.alerts} />
            <Switch>
              <Route path="/login" render={() => <Login auth={authProps} />} />
              <Route path="/signup" component={Register} />
              <Route
                path="/createworkspace"
                render={props => (
                  <CreateWorkspace {...props} createAlert={this.createAlert} />
                )}
              />
              {this.state.finishedLoading && !this.state.isAuthenticated && (
                <Redirect push to="/login" />
              )}
              <Route
                exact
                path="/"
                render={props => (
                  <ArticleList
                    {...props}
                    currentWorkspace={this.state.currentWorkspace}
                    createAlert={this.createAlert}
                  />
                )}
              />
              <Route
                exact
                path="/articles/:articleId"
                render={props => (
                  <ArticleDetail
                    {...props}
                    currentWorkspace={this.state.currentWorkspace}
                    createAlert={this.createAlert}
                  />
                )}
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
