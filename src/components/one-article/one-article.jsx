// import { useState, useEffect } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
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
import { getLoading, addTags } from "../store/articleReduser";
import { unFavorite, favoriteArticle } from "../articles-list/artcles-list";

const token = JSON.parse(localStorage.getItem("token"))?.user.token;
const articl = [
  JSON.parse(localStorage.getItem("oneArticle"))?.payload.article,
];
// const article = articl || [];
// console.log(article);

const Article = () => {
  const user = JSON.parse(localStorage.getItem("token"))?.user.username;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.articles.loading);
  // const article = useSelector((state) => state.articles.oneArticle);
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
  // console.log(article);
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
                    {article.title}
                  </span>
                  <div
                    className="favotite-count"
                    onClick={() => {
                      article.favorited
                        ? unFavorite(article.slug)
                        : favoriteArticle(article.slug);
                    }}
                  >
                    {article.favorited && (
                      <HeartFilled style={{ color: "#FF0707" }} />
                    )}
                    {!article.favorited && <HeartOutlined />}
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
                {article.description}
              </div>
              {user === article.author.username && token && (
                <div className={classes["buttons-container"]}>
                  <Link to="/articlesList">
                    <button
                      className={classes["delete"]}
                      onClick={() => {
                        deleteArticle(article.slug).then(() =>
                          window.location.reload()
                        );
                      }}
                    >
                      Delete
                    </button>
                  </Link>
                  <Link to="/edit-article">
                    <button
                      type="button"
                      className={classes["edit"]}
                      onClick={() => {
                        dispatch(addTags(article.tagList));
                      }}
                    >
                      Edit
                    </button>
                  </Link>
                </div>
              )}
            </div>
            <div className="body">
              <ReactMarkdown>{article.body}</ReactMarkdown>
            </div>
          </>
        </div>
      ))}
    </div>
  );
};

export default Article;
