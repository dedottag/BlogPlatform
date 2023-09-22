import ArticlesList from "../articles-list";
import SignUp from "../sign-up";
import SignIn from "../sign-in";
import Header from "../header";
import NewArticle from "../new-article";
import EditProfile from "../edit-profile";
import EditArticle from "../edit-article";
import FullArticle from "../full-article/full-article";
import Article from "../one-article";
import { Pagination } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles, pageSize } from "../store/articleReduser";
import { Route, Routes, useLocation } from "react-router-dom";

import "./app.css";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pageNumber = useSelector((state) => state.articleReduser.pageSize);

  // getArticleFetch сейчас этот запрос вызывается в слайсе, не ua, с помощью createAsyncThunk
  // function getArticleFetch() {
  //   // fetch(
  //   //   `https://blog.kata.academy/api/articles?limit=10&offset=${pageNumber}`,
  //   //   {
  //   //     headers: {
  //   //       "Content-Type": "application/json;charset=utf-8",
  //   //       Authorization: `Bearer ${token}`,
  //   //     },
  //   //   }
  //   // )
  //   dispatch(fetchArticles(pageNumber, token));
  //   // .then((res) => res.json())
  //   // .then((res) => {
  //   //   dispatch((res = getArticleAction(res)));
  //   // });
  // }

  useEffect(() => {
    dispatch(fetchArticles(pageNumber));
  }, [pageNumber]);

  return (
    <>
      <Header />
      <div className="app-container">
        <Routes>
          <Route path="/edit-article" element={<EditArticle />}></Route>
          <Route path="/edit-profile" element={<EditProfile />}></Route>
          <Route path="/new-article" element={<NewArticle />}></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/article" element={<Article />}></Route>
          <Route path="/full-article/:slug" element={<FullArticle />}></Route>
          <Route path={`/:page`} element={<ArticlesList />}></Route>
        </Routes>
        {location.pathname === "/:page" && (
          <Pagination
            className="pagination"
            page={pageNumber / 5 + 1}
            pageSize={1}
            total={10}
            shape="rounded"
            onChange={(num) => {
              dispatch(pageSize((num - 1) * 5));
            }}
          />
        )}
      </div>
    </>
  );
};

export default App;
