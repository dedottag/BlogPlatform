import { useSelector } from "react-redux";
import Like from "./Like.png";
import NoLike from "./noLike.png";
import "./articles-list.scss";
import { format, addYears } from "date-fns";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getOneArticle, pageSize, getLoading } from "../store/articleReduser";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "../spinner";
import { getArticles } from "../app/app";
const token = JSON.parse(localStorage.getItem("token"))?.user.token;

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
  let keys = 0;
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

export async function unFavorite(slug) {
  return await fetch(
    `https://blog.kata.academy/api/articles/${slug}/favorite`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  // const data = await result.json();
  // console.log(data);
}

export async function favoriteArticle(slug) {
  return await fetch(
    `https://blog.kata.academy/api/articles/${slug}/favorite`,
    {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  // const data = await result.json();
  // console.log(data);
}

const ArticlesList = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  // console.log(articles.map((ar) => ar.favorited));
  const loading = useSelector((state) => state.articles.loading);
  // console.log(articles);
  const pageNumber = useSelector((state) => state.articles.pageSize);

  useEffect(() => {
    if (articles.length) {
      dispatch(getLoading(false));
    }
  });

  function getArticle(link) {
    fetch(`https://blog.kata.academy/api/articles/${link}`, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      // .then((res) => console.log(res));
      .then((res) => dispatch(getOneArticle(res)))
      .then((data) => localStorage.setItem("oneArticle", JSON.stringify(data)));
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="articles-list-container">
      {articles.map((article) => (
        <div
          className="article"
          key={article.slug}
          onClick={() => {
            getArticle(article.slug);
          }}
        >
          <div className="article-header">
            <div className="article-tittle-container">
              <div className="tittle-container">
                <Link className="link" to="/article">
                  <div className="tittle">
                    <span className="article-tittle">{article.title}</span>
                  </div>
                </Link>
                <div
                  className="favotite-count"
                  onClick={() => {
                    article.favorited
                      ? unFavorite(article.slug).then(() =>
                          window.location.reload()
                        )
                      : favoriteArticle(article.slug).then(() =>
                          window.location.reload()
                        );
                  }}
                >
                  {/* <input
                    className="article-like"
                    type="checkbox"
                    disabled={false}
                    // checked={article.favorited}
                    onChange={() => {
                      if (!article.favorited) {
                        favoriteArticle(article.slug);
                      }
                      if (article.favorited) {
                        unFavorite(article.slug);
                      }
                    }}
                  /> */}
                  {/* <div className="like-box"></div> */}
                  {article.favorited && (
                    <HeartFilled style={{ color: "#FF0707" }} />
                  )}
                  {!article.favorited && <HeartOutlined />}

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

      <Pagination
        className="pagination"
        page={pageNumber / 5 + 1}
        pageSize={1}
        total={10}
        shape="rounded"
        onChange={(num) => {
          dispatch(pageSize((num - 1) * 5));
          console.log(pageNumber);
        }}
      />
    </div>
  );
};

export default ArticlesList;
