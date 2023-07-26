import "./sign-in.scss";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getRedirect } from "../store/articleReduser";

const SignIn = () => {
  const token = localStorage.getItem("token");
  const redirect = useSelector((state) => state.articles.redirect);
  console.log(redirect);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    const user = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    // console.log(JSON.stringify(user));
    fetch("https://blog.kata.academy/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((data) => data.json())
      .then((data) => localStorage.setItem("token", JSON.stringify(data)))
      .then(dispatch(getRedirect(true)))
      .catch((err) => console.log(err));
    reset();
  };

  if (redirect) {
    return <Redirect to={"/articlesList"} />;
  }
  return (
    <div className="sign-in-container">
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login-details-ocntainer">
          <div className="email-container">
            <label className="label">
              Email adress
              <input
                className="user-email"
                {...register("email", {
                  pattern: {
                    value: /[^@\s]+@[^@\s]+\.[^@\s]+/,
                    message: "Invalid email address",
                  },
                  errors,
                })}
                placeholder="Email adress"
              />
            </label>
          </div>
          <div className="password-container">
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
        </div>
        <div className="login-button-container">
          <button className="login">Login</button>
          <span>
            Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
