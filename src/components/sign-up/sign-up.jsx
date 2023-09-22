import "./sign-up.scss";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getRedirect } from "../store/articleReduser";

const SignUp = () => {
  const redirect = useSelector((state) => state.articleReduser.redirect);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onBlur",
  });

  async function signUp(data) {
    const user = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };
    let result = await fetch("https://blog.kata.academy/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!result.ok) {
      result = await result.json();
      console.log(result);
    }
    if (result.ok) {
      data = await result.json().catch((err) => console.log(err));
      localStorage.setItem("token", JSON.stringify(data));
      return dispatch(getRedirect(true));
    }
  }
  if (redirect) {
    return <Navigate replace to={"/:page"} />;
  }
  return (
    <div className="sign-up-container">
      <h1>Create new account</h1>
      <form onSubmit={handleSubmit(signUp)}>
        <div className="user-information-container">
          <div className="name">
            <label className="label">
              Username
              <input
                className="user-name"
                {...register("username", {
                  required: "Поле должно быть обязательным",
                  minLength: {
                    value: 3,
                    message: "Минимум 3 символа",
                  },
                  maxLength: {
                    value: 20,
                    message: "Максимум 20 символов",
                  },
                  pattern: {
                    value: /^[a-z][a-z0-9]*$/,
                    message:
                      "You can only use lowercase English letters and numbers",
                  },
                })}
                placeholder="Username"
              />
              <div style={{ fontSize: "15px" }}>
                {errors?.username && (
                  <span>{errors?.username?.message || "error"}</span>
                )}
              </div>
            </label>
          </div>
          <div className="email">
            <label className="label">
              Email adress
              <input
                className="user-email"
                {...register("email", {
                  required: "Поле должно быть обязательным",
                  pattern: {
                    value: /[^@\s]+@[^@\s]+\.[^@\s]+/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Email adress"
              />
              <div style={{ fontSize: "15px" }}>
                {errors?.email && (
                  <span>{errors?.email?.message || "error"}</span>
                )}
              </div>
            </label>
          </div>
          <div className="password">
            <label className="label">
              Password
              <input
                className="user-password"
                {...register("password", {
                  required: "Поле должно быть обязательным",
                  minLength: {
                    value: 5,
                    message: "Минимум 6 символа",
                  },
                  maxLength: {
                    value: 40,
                    message: "Максимум 40 символов",
                  },
                })}
                placeholder="Password"
              />
              <div style={{ fontSize: "15px" }}>
                {errors?.password && (
                  <span>{errors?.password?.message || "error"}</span>
                )}
              </div>
            </label>
          </div>
          <div className="repeat">
            <label className="label">
              Repeat password
              <input
                className="user-repeat-password"
                {...register("passwordRepeat", {
                  required: "Поле должно быть обязательным",
                  validate: (val) => {
                    if (watch("password") !== val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
                placeholder="Repeat password"
              />
              <div style={{ fontSize: "15px" }}>
                {errors?.passwordRepeat && (
                  <span>{errors?.passwordRepeat?.message || "error"}</span>
                )}
              </div>
            </label>
          </div>
        </div>
        <div className="agree-container">
          <div className="agree-text-container">
            <input
              type="checkbox"
              {...register("checkbox", {})}
              required="lnlnl"
            />
            <span>I agree to the processing of my personal information</span>
          </div>
        </div>
        <div className="create-button-container">
          <button className="create-button">Create</button>
          <span>
            Already have an account? <Link to="/sign-in">Sign In</Link>.
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
