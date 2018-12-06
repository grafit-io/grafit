import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import { APIService } from "../../services/APIService";

export default class RelatedArticleBadges extends Component {
  deleteRelated = relatedArticle => {
    APIService.deleteRelated(this.props.currentArticle.id, relatedArticle.id);
    this.props.removeRelated(relatedArticle.id);
  };

  render() {
    return (
      <Fragment>
        {this.props.relatedArticles.map(relatedArticle => (
          <span className="badge badge-info" key={relatedArticle.id}>
            <Link
              to={`/articles/${relatedArticle.id}`}
              style={{ fontWeight: 700, color: "#fff" }}
            >
              {relatedArticle.title}
            </Link>
            {this.props.deletable && (
              <Button
                onClick={() => {
                  if (
                    window.confirm("Are you sure you wish to delete this item?")
                  )
                    this.deleteRelated(relatedArticle);
                }}
                style={{
                  marginLeft: 5,
                  padding: "0px 2px",
                  lineHeight: 1,
                  verticalAlign: "middle",
                  fontWeight: 700,
                  fontSize: 12,
                  textAlign: "center"
                }}
              >
                x
              </Button>
            )}
          </span>
        ))}
      </Fragment>
    );
  }
}
