import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { getRedirect } from "../store/articleReduser";

const EditArticle = () => {
  const token = JSON.parse(localStorage.getItem("token"))?.user.token;
  const article = useSelector((state) => state.articles.oneArticle);
  const slug = article[0]?.slug;
  //   console.log(article);
  const dispatch = useDispatch();
  const redirect = useSelector((state) => state.articles.redirect);

  const [inputs, setInputs] = useState([]);
  let val;
  let key = 0;

  const Tags = () => {
    const handleRemoveItem = (idx) => {
      const temp = [...inputs];

      temp.splice(idx, 1);
      setInputs(temp);
    };

    return (
      <div className="input-tag-container">
        {inputs}
        <input
          className="input-tag"
          placeholder="Text"
          {...register("tags")}
          onChange={(e) => {
            val = e.target.value;
          }}
        />
        <button className="delete-button" type="button">
          Delete
        </button>
        <button
          className="add-button"
          type="button"
          onClick={() => {
            if (val) {
              setInputs([
                <div className="input-tag-container" key={key++}>
                  {[...inputs]}
                  <input
                    className="input-tag"
                    placeholder="Text"
                    {...register("tag")}
                    onChange={(e) => {
                      val = e.target.value;
                    }}
                  />
                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => {
                      handleRemoveItem(key);
                    }}
                  >
                    Delete
                  </button>
                </div>,
              ]);
            }
          }}
        >
          Add tag
        </button>
      </div>
    );
  };

  const { handleSubmit, register, reset } = useForm({
    mode: "onBlur",
  });

  async function editArticle(data) {
    const user = {
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
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
      data = await result.json();
      reset();
      return dispatch(getRedirect(true));
    }
  }

  // const editArticle = (data) => {
  //   const user = {
  //     article: {
  //       title: data.title,
  //       description: data.description,
  //       body: data.text,
  //     },
  //   };
  //   // console.log(JSON.stringify(user));
  //   fetch(`https://blog.kata.academy/api/articles/${slug}`, {
  //     method: "PUT",
  //     headers: {
  //       Authorization: `Token ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   })
  //     .then((data) => data.json())
  //     .then(dispatch(getRedirect(true)))
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  //   reset();
  // };
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
              <input
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
              <Tags />
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
