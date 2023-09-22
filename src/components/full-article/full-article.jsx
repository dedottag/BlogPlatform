import Article from "../one-article";
import Spinner from "../spinner";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addTags, getFullArticle } from "../store/articleReduser";
import { useParams } from "react-router-dom";

const FullArticle = () => {
  const fullArticle = useSelector((state) => state.articleReduser.fullArticle);
  const taglist = useSelector((state) => state.articleReduser.tagList);
  const [vision, setVision] = useState(false);
  const { slug } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    setVision(true);
    dispatch(addTags(taglist));
    dispatch(getFullArticle(slug));
  }, []);

  if (Object.keys(fullArticle).length !== 0) {
    return <Article {...fullArticle} vision={vision} />;
  } else {
    return <Spinner />;
  }
};

export default FullArticle;
