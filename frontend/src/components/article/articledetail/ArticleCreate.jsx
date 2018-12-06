import { withRouter } from "react-router-dom";

import ArticleEdit from "./ArticleEdit";
import { APIService } from "../../../services/APIService";

class ArticleCreate extends ArticleEdit {
  handleSubmit = () => {
    APIService.createArticle(
      this.state.article.title,
      this.state.article.text,
      this.props.currentWorkspace
    )
      .then(article => {
        this.props.history.push("/articles/" + article.id);
        this.props.setDefaultView();
        this.props.setArticle(article);
        this.props.createAlert(
          "Created Article",
          `Article ${this.state.article.title} was saved`
        );
      })
      .catch(console.log);
  };
}

export default withRouter(ArticleCreate);
