import { withRouter } from "react-router-dom";

import ArticleEdit from "./ArticleEdit";
import { APIService } from "../../services/APIService";

class ArticleUpdate extends ArticleEdit {
  handleSubmit = () => {
    APIService.updateArticle(
      this.state.article.id,
      this.state.article.title,
      this.state.article.text,
      this.props.currentWorkspace
    )
      .then(article => {
        this.props.setDefaultView();
        this.props.setArticle(article);
        this.props.createAlert(
          "Updated Article",
          `Article ${this.state.article.title} was updated`
        );
      })
      .catch(console.log);
  };
}

export default withRouter(ArticleUpdate);
