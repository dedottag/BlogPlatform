import "./new-article.scss";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRedirect } from "../store/articleReduser";

const token = JSON.parse(localStorage.getItem("token"))?.user.token;

const NewArticle = () => {
  const [inputs, setInputs] = useState([]);
  let val;
  let key = 0;
  const dispatch = useDispatch();
  const redirect = useSelector((state) => state.articles.redirect);
  // console.log(redirect);

  const { handleSubmit, register, reset } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    const user = {
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
        tagsList: ["tag1", "2"],
        token: token,
      },
    };
    console.log(user);
    console.log(JSON.stringify(user));
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
      .catch((err) => console.log(err));
    reset();
  };

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
            <input
              className="input-text"
              placeholder="Text"
              {...register("text")}
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
  );
};

export default NewArticle;
