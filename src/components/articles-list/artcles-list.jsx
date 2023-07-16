import { useSelector } from "react-redux";
import "./articles-list.css";
import { format, addYears } from "date-fns";
import { HeartOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getOneArticle } from "../store/articleReduser";
import { Pagination } from "antd";
import { Link } from "react-router-dom";

let keys = 0;

export function dateFormatting(data) {
  if (data === "") {
    return "date is not defined";
  }
  const dat = addYears(new Date(data), 1);
  return format(dat, "MMMM dd, yyyy");
}

export function koncut(text, limit) {
  const re = new RegExp("(^.{" + (limit - 1) + "}([^ ]+|\\s))(.*)");
  if (text) {
    const result = text.replace(re, "$1");
    return `${result}`;
  }
}

export function tagsReturn(tagList) {
  return (
    <div className="tags">
      {tagList.map((tag) => (
        <div className="tag" key={keys++}>
          {tag}
        </div>
      ))}
    </div>
  );
}

const ArticlesList = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  let key = 0;

  function getArticle(link) {
    fetch(`https://blog.kata.academy/api/articles/${link}`)
      .then((res) => res.json())
      // .then((res) => console.log(res));
      .then((res) => dispatch(getOneArticle(res)));
  }

  return (
    <div className="articles-list-container">
      {articles.map((article) => (
        <div
          className="article"
          key={key++}
          onClick={() => {
            getArticle(article.slug);
          }}
        >
          <div className="article-header">
            <div className="article-tittle-container">
              <div className="tittle-container">
                <Link className="link" to="/article">
                  <div className="tittle">
                    <span className="article-tittle">
                      {koncut(article.title, 10)}
                    </span>
                  </div>
                </Link>
                <div className="favotite-count">
                  <HeartOutlined />
                  <span>{article.favoritesCount}</span>
                </div>
              </div>
              <div className="article-tags">{tagsReturn(article.tagList)}</div>
            </div>
            <div className="author-info-container">
              <div className="autor-info">
                <div className="author-user-name">
                  {article.author.username}
                </div>
                <div className="create-date">
                  {dateFormatting(article.createdAt)}
                </div>
              </div>
              <div>
                <img
                  className="author-image"
                  alt=""
                  src={article.author.image}
                ></img>
              </div>
            </div>
          </div>
          <div className="article-body">{koncut(article.description, 50)}</div>
        </div>
      ))}

      <Pagination className="pagination" total={5} pageSize={1} />
    </div>
  );
};

export default ArticlesList;
