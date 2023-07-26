import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticleAction } from "../store/articleReduser";
import ArticlesList from "../articles-list";
import SignUp from "../sign-up";
import SignIn from "../sign-in";
import Header from "../header";
import NewArticle from "../new-article";
import EditProfile from "../edit-profile";

import Article from "../one-article";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./app.css";

const App = () => {
  const dispatch = useDispatch();
  const pageNumber = useSelector((state) => state.articles.pageSize);
  // console.log(pageNumber);

  const getArticleFetch = () => {
    fetch(`https://blog.kata.academy/api/articles?page=${pageNumber}/`)
      .then((res) => res.json())
      // .then((res) => console.log(res))
      .then((res) => dispatch((res = getArticleAction(res))));
  };

  useEffect(() => {
    getArticleFetch();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Header />
        <Route path="/edit-profile" component={EditProfile}></Route>
        <Route path="/new-article" component={NewArticle}></Route>
        <Route path="/sign-in" component={SignIn}></Route>
        <Route path="/sign-up" component={SignUp}></Route>
        <Route path="/article" component={Article}></Route>
        <Route path="/articlesList" component={ArticlesList}></Route>
      </div>
    </Router>
  );
};

export default App;
