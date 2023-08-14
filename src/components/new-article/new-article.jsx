import "./new-article.scss";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRedirect } from "../store/articleReduser";
import { addTag, addTaglist, dellTag } from "../store/articleReduser";

const token = JSON.parse(localStorage.getItem("token"))?.user.token;

const NewArticle = () => {
  const dispatch = useDispatch();
  const redirect = useSelector((state) => state.articles.redirect);
  const tags = useSelector((state) => state.articles.tag);
  const tagsList = useSelector((state) => state.articles.tagList);
  // console.log(tagsList);
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
    // console.log(user);
    // console.log(JSON.stringify(user));
    fetch("https://blog.kata.academy/api/articles", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((data) => data.json())
      // .then((data) => console.log(data))
      .then(dispatch(getRedirect(true)))
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
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
            // console.log(index);
          }}
        >
          Delete
        </button>
      </div>
    ));

  if (redirect) {
    return <Redirect to="/articlesList" />;
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
