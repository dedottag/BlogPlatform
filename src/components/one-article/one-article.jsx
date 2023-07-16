// import { useState, useEffect } from "react";
import { HeartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import {
  dateFormatting,
  koncut,
  tagsReturn,
} from "../articles-list/artcles-list";
import classes from "./one-article.module.scss";

const Article = () => {
  const article = useSelector((state) => state.articles.oneArticle);
  let key = 0;

  return (
    <div className={classes["articles-container"]}>
      {article.map((article) => (
        <div className={classes["one-article"]} key={key++}>
          <div className="article-header">
            <div className="article-tittle-container">
              <div className="tittle-container">
                <span className="article-tittle">
                  {koncut(article.title, 10)}
                </span>
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
          <div className="body">{article.body}</div>
        </div>
      ))}
    </div>
  );
};

export default Article;
