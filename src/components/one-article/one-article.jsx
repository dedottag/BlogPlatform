// import { useState, useEffect } from "react";
import { HeartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
  const [vision, setVision] = useState(false);
  const [slug, setSlug] = useState();
  //   console.log(slug);
  const user = JSON.parse(localStorage.getItem("token"))?.user.username;
  const token = JSON.parse(localStorage.getItem("token"))?.user.token;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.articles.loading);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const editArticle = (data) => {
    const user = {
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
      },
    };
    console.log(JSON.stringify(user));
    fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((data) => data.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    reset();
  };

  const deleteArticle = (slug) => {
    fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    }).catch((err) => console.log(err));
  };

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
    <>
      <div className={classes["articles-container"]}>
        {article.map((article) => (
          <div className={classes["one-article"]} key={key++}>
            {vision && (
              <>
                <h1>Edit article</h1>
                <form onSubmit={handleSubmit(editArticle)}>
                  <div className="inputs-container">
                    <label>
                      Title
                      <input
                        className="input-title"
                        // placeholder="Title"
                        defaultValue={koncut(article.title, 10)}
                        {...register("title")}
                      />
                    </label>
                    <label>
                      Short description
                      <input
                        className="input-short-description"
                        // placeholder="Short description"
                        {...register("description")}
                        defaultValue={koncut(article.description)}
                      />
                    </label>
                    <label>
                      Text
                      <input
                        className="input-text"
                        // placeholder="Text"
                        {...register("text")}
                        defaultValue={article.body}
                      />
                    </label>
                  </div>
                  <div className="tags-container">
                    <label>
                      <div className="text-teg">Text</div>
                    </label>
                  </div>
                  <div className="send-button-container">
                    <button>Send</button>
                  </div>
                </form>
              </>
            )}
            {!vision && (
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
                      <button
                        className={classes["edit"]}
                        onClick={() => {
                          setVision(true);
                          setSlug(article.slug);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
                <div className="body">{article.body}</div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Article;
