import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { getRedirect } from "../store/articleReduser";
import { addTag, addTaglist, dellTag } from "../store/articleReduser";

const EditArticle = () => {
  const token = JSON.parse(localStorage.getItem("token"))?.user.token;
  const article = useSelector((state) => state.articleReduser.fullArticle);
  const slug = article?.slug;
  const dispatch = useDispatch();
  const redirect = useSelector((state) => state.articleReduser.redirect);
  const tags = useSelector((state) => state.articleReduser.tag);
  const tagsList = useSelector((state) => state.articleReduser.tagList);

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

  const { handleSubmit, register } = useForm({
    mode: "onBlur",
  });

  async function editArticle(data) {
    const user = {
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: tagsList,
      },
    };

    let result = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!result.ok) {
      result = await result.json();
      console.log(result);
    }
    if (result.ok) {
      dispatch(getRedirect(true));
      data = await result.json().then(() => window.location.reload());
      // reset();
    }
  }
  if (redirect) {
    return <Navigate replace to="/:page" />;
  }
  return (
    <>
      <div className="new-article-container">
        <h1>Edit article</h1>
        <form onSubmit={handleSubmit(editArticle)}>
          <div className="inputs-container">
            <label>
              Title
              <input
                className="input-title"
                // placeholder="Title"
                defaultValue={article?.title}
                {...register("title")}
              />
            </label>
            <label>
              Short description
              <input
                className="input-short-description"
                // placeholder="Short description"
                {...register("description")}
                defaultValue={article?.description}
              />
            </label>
            <label>
              Text
              <textarea
                className="input-text"
                // placeholder="Text"
                {...register("text")}
                defaultValue={article?.body}
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
            <button style={{ cursor: "pointer" }}>Send</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditArticle;
