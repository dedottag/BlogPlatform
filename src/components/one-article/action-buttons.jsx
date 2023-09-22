import { Link } from "react-router-dom";
import { deleteArticle } from "../store/articleReduser";
import classes from "./one-article.module.scss";

const ActionButtons = (slug) => {
  return (
    <div className={classes["buttons-container"]}>
      <Link to="/:page">
        <button
          className={classes["delete"]}
          onClick={() => {
            deleteArticle(slug);
          }}
        >
          Delete
        </button>
      </Link>
      <Link to="/edit-article">
        <button type="button" className={classes["edit"]}>
          Edit
        </button>
      </Link>
    </div>
  );
};

export default ActionButtons;
