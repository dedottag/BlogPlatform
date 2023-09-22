import "./sign-in.scss";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getRedirect } from "../store/articleReduser";

const SignIn = () => {
  const redirect = useSelector((state) => state.articleReduser.redirect);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  async function getLogin(data) {
    const user = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    let result = await fetch("https://blog.kata.academy/api/users/login", {
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
    <div className="sign-in-container">
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit(getLogin)}>
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
