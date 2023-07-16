import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getArticleAction } from "../store/articleReduser";
import ArticlesList from "../articles-list";
import SignUp from "../sign-up";
import SignIn from "../sign-in";
import Header from "../header";

import Article from "../one-article";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./app.css";

const App = () => {
  const dispatch = useDispatch();

  const getArticleFetch = () => {
    fetch("https://blog.kata.academy/api/articles/")
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
        <Route path="/sign-in" component={SignIn}></Route>
        <Route path="/sign-up" component={SignUp}></Route>
        <Route path="/article" component={Article}></Route>
        <Route path="/articlesList" component={ArticlesList}></Route>
      </div>
    </Router>
  );
};

export default App;
