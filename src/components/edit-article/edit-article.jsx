import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getRedirect } from "../store/articleReduser";
import { addTag, addTaglist, dellTag } from "../store/articleReduser";

const EditArticle = () => {
  const token = JSON.parse(localStorage.getItem("token"))?.user.token;
  const article = useSelector((state) => state.articles.oneArticle);
  // const article = [
  //   JSON.parse(localStorage.getItem("oneArticle")).payload.article,
  // ];
  const slug = article[0]?.slug;
  // console.log(article[0]);
  const dispatch = useDispatch();
  const redirect = useSelector((state) => state.articles.redirect);
  const tags = useSelector((state) => state.articles.tag);
  const tagsList = useSelector((state) => state.articles.tagList);
  // console.log(tagsList);

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

  const { handleSubmit, register, reset } = useForm({
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
    return <Redirect to="/articlesList" />;
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
                defaultValue={article[0]?.title}
                {...register("title")}
              />
            </label>
            <label>
              Short description
              <input
                className="input-short-description"
                // placeholder="Short description"
                {...register("description")}
                defaultValue={article[0]?.description}
              />
            </label>
            <label>
              Text
              <textarea
                className="input-text"
                // placeholder="Text"
                {...register("text")}
                defaultValue={article[0]?.body}
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
    </>
  );
};

export default EditArticle;
