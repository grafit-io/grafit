import React, { Component } from "react";
import ArticleList from "./components/articleList";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>grafit.io</h1>
        <ArticleList />
      </div>
    );
  }
}

export default App;
