import ActionButtons from "./action-buttons";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Link } from "react-router-dom";
import { dateFormatting } from "../utils";
import { useDispatch } from "react-redux";
import { unFavorite, favoriteArticle, addTags } from "../store/articleReduser";
import classes from "./one-article.module.scss";

const token = JSON.parse(localStorage.getItem("token"))?.user.token;
const user = JSON.parse(localStorage.getItem("token"))?.user.username;

export function tagsReturn(tagList) {
  let keys = 0;
  return (
    <div className="tags">
      {tagList?.map((tag) => (
        <div className="tag" key={keys++}>
          {tag}
        </div>
      ))}
    </div>
  );
}

const Article = ({
  title,
  favorited,
  slug,
  favoritesCount,
  tagList,
  author,
  createdAt,
  description,
  body,
  vision,
}) => {
  const dispatch = useDispatch();

  return (
    <div className={classes["article-container"]}>
      <div className={classes["article-header"]}>
        <div className={classes["title-container"]}>
          <div className={classes["title"]}>
            <Link className="link" to={`/full-article/${slug}`}>
              <div
                className={classes["article-title"]}
                onClick={() => {
                  dispatch(addTags(tagList));
                }}
              >
                {title}
              </div>
            </Link>
            <div
              className="favotite-count"
              onClick={() => {
                favorited
                  ? unFavorite(slug, token)
                  : favoriteArticle(slug, token);
              }}
            >
              {favorited && <HeartFilled style={{ color: "#FF0707" }} />}
              {!favorited && <HeartOutlined />}
              <span>{favoritesCount}</span>
            </div>
          </div>

          <div className={classes["taglist"]}>{tagsReturn(tagList)}</div>
        </div>
        <div className={classes["user-info-container"]}>
          <div className={classes["user-name"]}>
            <span>{author.username}</span>
            <span style={{ color: "#00000080" }}>
              {dateFormatting(createdAt)}
            </span>
          </div>
          <img
            className={classes["user-avatar"]}
            src={author.image}
            alt="avatar"
          />
        </div>
      </div>
      <div className={classes["article-description-container"]}>
        <span className={classes["description"]}>{description}</span>
        {user === author.username && token && vision && (
          <ActionButtons slug={slug} />
        )}
      </div>
      <br />
      {vision ? <ReactMarkdown>{body}</ReactMarkdown> : null}
    </div>
  );
};

// const Article = () => {
//   const user = JSON.parse(localStorage.getItem("token"))?.user.username;
//   const dispatch = useDispatch();
//   const loading = useSelector((state) => state.articles.loading);
//   // const article = useSelector((state) => state.articles.oneArticle);
//   useForm({
//     mode: "onBlur",
//   });

//   async function deleteArticle(slug) {
//     const result = await fetch(
//       `https://blog.kata.academy/api/articles/${slug}`,
//       {
//         method: "DELETE",
//         headers: {
//           Authorization: `Token ${token}`,
//         },
//       }
//     ).catch((err) => console.log(err));
//     return result;
//   }

//   // const deleteArticle = (slug) => {
//   //   fetch(`https://blog.kata.academy/api/articles/${slug}`, {
//   //     method: "DELETE",
//   //     headers: {
//   //       Authorization: `Token ${token}`,
//   //     },
//   //   }).catch((err) => console.log(err));
//   // };

//   const article = useSelector((state) => state.articles.oneArticle);
//   // console.log(article);
//   let key = 0;

//   useEffect(() => {
//     if (article.length) {
//       dispatch(getLoading(true));
//     }
//   });

//   if (!loading) {
//     return <Spinner />;
//   }
//   return (
//     <div className={classes["articles-container"]}>
//       {article.map((article) => (
//         <div className={classes["one-article"]} key={key++}>
//           <>
//             <div className="article-header">
//               <div className={classes["article-tittle-container"]}>
//                 <div className={classes["tittle-container"]}>
//                   <span className={classes["article-tittle"]}>
//                     {article.title}
//                   </span>
//                   <div
//                     className="favotite-count"
//                     onClick={() => {
//                       article.favorited
//                         ? unFavorite(article.slug)
//                         : favoriteArticle(article.slug);
//                     }}
//                   >
//                     {article.favorited && (
//                       <HeartFilled style={{ color: "#FF0707" }} />
//                     )}
//                     {!article.favorited && <HeartOutlined />}
//                     <span>{article.favoritesCount}</span>
//                   </div>
//                 </div>

//                 <div className="article-tags">
//                   {tagsReturn(article.tagList)}
//                 </div>
//               </div>
//               <div className="author-info-container">
//                 <div className="autor-info">
//                   <div className="author-user-name">
//                     {article.author.username}
//                   </div>
//                   <div className="create-date">
//                     {dateFormatting(article.createdAt)}
//                   </div>
//                 </div>
//                 <div>
//                   <img
//                     className="author-image"
//                     alt=""
//                     src={article.author.image}
//                   ></img>
//                 </div>
//               </div>
//             </div>
//             <div className={classes["article-description-container"]}>
//               <div className={classes["article-description"]}>
//                 {article.description}
//               </div>
//               {user === article.author.username && token && (
//                 <div className={classes["buttons-container"]}>
//                   <Link to="/articlesList">
//                     <button
//                       className={classes["delete"]}
//                       onClick={() => {
//                         deleteArticle(article.slug).then(() =>
//                           window.location.reload()
//                         );
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </Link>
//                   <Link to="/edit-article">
//                     <button
//                       type="button"
//                       className={classes["edit"]}
//                       onClick={() => {
//                         dispatch(addTags(article.tagList));
//                       }}
//                     >
//                       Edit
//                     </button>
//                   </Link>
//                 </div>
//               )}
//             </div>
//             <div className="body">
//               <ReactMarkdown>{article.body}</ReactMarkdown>
//             </div>
//           </>
//         </div>
//       ))}
//     </div>
//   );
// };

export default Article;
