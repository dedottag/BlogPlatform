import Spinner from "../spinner";
import Error from "../error";
import Article from "../one-article";
import { useSelector } from "react-redux";
import "./articles-list.scss";

const ArticlesList = () => {
  const articles = useSelector((state) => state.articleReduser.articles);
  // console.log(articles.map((article) => article.slug + article.createdAt));
  const loading = useSelector((state) => state.articleReduser.loading);
  const error = useSelector((state) => state.articleReduser.loading);

  if (loading) {
    return <Spinner />;
  } else if (error) {
    return <Error />;
  }
  return (
    <div className="articles-list-container">
      {articles.map((article) => (
        <Article {...article} key={article.slug} />
        // <div
        //   className="article"
        //   key={article.slug}
        //   onClick={() => {
        //     getArticle(article.slug);
        //   }}
        // >
        //   <div className="article-header">
        //     <div className="article-tittle-container">
        //       <div className="tittle-container">
        //         <Link className="link" to="/article">
        //           <div className="tittle">
        //             <span className="article-tittle">{article.title}</span>
        //           </div>
        //         </Link>
        //         <div
        //           className="favotite-count"
        //           onClick={() => {
        //             article.favorited
        //               ? unFavorite(article.slug).then(() =>
        //                   window.location.reload()
        //                 )
        //               : favoriteArticle(article.slug).then(() =>
        //                   window.location.reload()
        //                 );
        //           }}
        //         >
        //           {/* <input
        //             className="article-like"
        //             type="checkbox"
        //             disabled={false}
        //             // checked={article.favorited}
        //             onChange={() => {
        //               if (!article.favorited) {
        //                 favoriteArticle(article.slug);
        //               }
        //               if (article.favorited) {
        //                 unFavorite(article.slug);
        //               }
        //             }}
        //           /> */}
        //           {/* <div className="like-box"></div> */}
        //           {article.favorited && (
        //             <HeartFilled style={{ color: "#FF0707" }} />
        //           )}
        //           {!article.favorited && <HeartOutlined />}

        //           <span>{article.favoritesCount}</span>
        //         </div>
        //       </div>
        //       <div className="article-tags">{tagsReturn(article.tagList)}</div>
        //     </div>
        //     <div className="author-info-container">
        //       <div className="autor-info">
        //         <div className="author-user-name">
        //           {article.author.username}
        //         </div>
        //         <div className="create-date">
        //           {dateFormatting(article.createdAt)}
        //         </div>
        //       </div>
        //       <div>
        //         <img
        //           className="author-image"
        //           alt=""
        //           src={article.author.image}
        //         ></img>
        //       </div>
        //     </div>
        //   </div>
        //   <div className="article-body">{koncut(article.description, 50)}</div>
        // </div>
      ))}
    </div>
  );
};

export default ArticlesList;
