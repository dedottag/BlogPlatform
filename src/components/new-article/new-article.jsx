import "./new-article.scss";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRedirect, getEditArticle } from "../store/articleReduser";
import { addTag, addTaglist, dellTag } from "../store/articleReduser";

const token = JSON.parse(localStorage.getItem("token"))?.user.token;

const NewArticle = () => {
  const dispatch = useDispatch();
  const redirect = useSelector((state) => state.articleReduser.redirect);
  const tags = useSelector((state) => state.articleReduser.tag);
  const tagsList = useSelector((state) => state.articleReduser.tagList);

  const { handleSubmit, register, reset } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => {
    const user = {
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: tagsList,
        token: token,
      },
    };
    getEditArticle(user).then(dispatch(getRedirect(true)));
    reset();
  };

  function delTag(ind) {
    const result = tagsList.filter((el, index) => {
      return index !== ind;
    });
    dispatch(dellTag(result));
  }

  const elements = () =>
    tagsList.map((el, index) => (
      <div className="input-tag-container" key={index}>
        <input className="input-tag" value={el} />
        <button
          className="delete-button"
          type="button"
          onClick={() => {
            delTag(index);
          }}
        >
          Delete
        </button>
      </div>
    ));

  if (redirect) {
    return <Navigate replace to="/:page" />;
  }
  return (
    <div className="new-article-container">
      <h1>Create new article</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs-container">
          <label>
            Title
            <input
              className="input-title"
              placeholder="Title"
              {...register("title")}
            />
          </label>
          <label>
            Short description
            <input
              className="input-short-description"
              placeholder="Short description"
              {...register("description")}
            />
          </label>
          <label>
            Text
            <textarea
              className="input-text"
              // type="text"
              placeholder="Text"
              {...register("text")}
            />
          </label>
        </div>
        <div className="tags-container">
          <label>
            <div className="label">Tags</div>
            <div className="input-tag-container">
              <input
                className="input-tag"
                placeholder="Text"
                value={tags}
                onChange={(e) => {
                  dispatch(addTag(e.target.value));
                }}
              />
              <button
                className="add-button"
                type="button"
                onClick={() => {
                  if (tags.length) {
                    dispatch(addTaglist(tags));
                    dispatch(addTag(""));
                  }
                }}
              >
                Add tag
              </button>
              {elements()}
            </div>
          </label>
        </div>
        <div className="send-button-container">
          <button>Send</button>
        </div>
      </form>
    </div>
  );
};

export default NewArticle;
