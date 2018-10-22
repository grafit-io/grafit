import React, { Component } from "react";

class ArticleList extends Component {
  state = {
    articles: [
      {
        id: 1,
        title: "How to build an app with react",
        text:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        tags: [
          {
            id: 1,
            name: "React"
          },
          {
            id: 2,
            name: "Customer"
          },
          {
            id: 3,
            name: "Tag 3"
          }
        ]
      },
      {
        id: 2,
        title: "Let's encrypt: changing the world",
        text:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
        tags: []
      },
      {
        id: 3,
        title: "Why a relational database is the right thing for you!",
        text:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,",
        tags: [
          {
            id: 1,
            name: "React"
          },
          {
            id: 2,
            name: "Customer"
          }
        ]
      }
    ]
  };

  render() {
    return (
      <div>
        {this.state.articles.map(article => (
          <div key={article.id}>
            <hr />
            <h2>{article.title}</h2>
            {article.tags.map(tag => (
              <a href="#" className="badge badge-info" key={tag.id}>
                {tag.name}
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
