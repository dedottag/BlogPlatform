import "./sign-in.scss";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="sign-in-container">
      <h1>Sign in</h1>
      <div className="login-details-ocntainer">
        <div className="email-container">
          <span>Email address</span>
          <input type="text" placeholder="Email address" />
        </div>
        <div className="password-container">
          <span>Password</span>
          <input type="text" placeholder="Password" />
        </div>
      </div>
      <div className="login-button-container">
        <button className="login">Login</button>
        <span>
          Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
        </span>
      </div>
    </div>
  );
};

export default SignIn;
