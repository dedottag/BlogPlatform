// import { useState, useEffect } from "react";
import { HeartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  dateFormatting,
  koncut,
  tagsReturn,
} from "../articles-list/artcles-list";
import classes from "./one-article.module.scss";
import Spinner from "../spinner";
import { useDispatch } from "react-redux";
import { getLoading } from "../store/articleReduser";

const Article = () => {
  const user = JSON.parse(localStorage.getItem("token"))?.user.username;
  const token = JSON.parse(localStorage.getItem("token"))?.user.token;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.articles.loading);

  useForm({
    mode: "onBlur",
  });

  async function deleteArticle(slug) {
    const result = await fetch(
      `https://blog.kata.academy/api/articles/${slug}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    ).catch((err) => console.log(err));
    return result;
  }

  // const deleteArticle = (slug) => {
  //   fetch(`https://blog.kata.academy/api/articles/${slug}`, {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Token ${token}`,
  //     },
  //   }).catch((err) => console.log(err));
  // };

  const article = useSelector((state) => state.articles.oneArticle);
  let key = 0;

  useEffect(() => {
    if (article.length) {
      dispatch(getLoading(true));
    }
  });

  if (!loading) {
    return <Spinner />;
  }
  return (
    <div className={classes["articles-container"]}>
      {article.map((article) => (
        <div className={classes["one-article"]} key={key++}>
          <>
            <div className="article-header">
              <div className={classes["article-tittle-container"]}>
                <div className={classes["tittle-container"]}>
                  <span className={classes["article-tittle"]}>
                    {koncut(article.title, 10)}
                  </span>
                  <div className="favotite-count">
                    <HeartOutlined />
                    <span>{article.favoritesCount}</span>
                  </div>
                </div>

                <div className="article-tags">
                  {tagsReturn(article.tagList)}
                </div>
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
            <div className={classes["article-description-container"]}>
              <div className={classes["article-description"]}>
                {koncut(article.description, 50)}
              </div>
              {user === article.author.username && token && (
                <div className={classes["buttons-container"]}>
                  <Link to="/articlesList">
                    <button
                      className={classes["delete"]}
                      onClick={() => {
                        deleteArticle(article.slug);
                      }}
                    >
                      Delete
                    </button>
                  </Link>
                  <Link to="/edit-article">
                    <button className={classes["edit"]}>Edit</button>
                  </Link>
                </div>
              )}
            </div>
            <div className="body">{article.body}</div>
          </>
        </div>
      ))}
    </div>
  );
};

export default Article;
