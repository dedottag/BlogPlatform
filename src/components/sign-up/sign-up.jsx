import "./sign-up.scss";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="sign-up-container">
      <h1>Create new account</h1>
      <div className="user-information-container">
        <div className="name">
          <span>Username</span>
          <input className="user-name" type="text" placeholder="Username" />
        </div>
        <div className="email">
          <span>Email adress</span>
          <input
            className="user-email"
            type="text"
            placeholder="Email adress"
          />
        </div>
        <div className="password">
          <span>Password</span>
          <input className="user-password" type="text" placeholder="Password" />
        </div>
        <div className="repeat">
          <span>Repeat password</span>
          <input
            className="user-repeat-password"
            type="text"
            placeholder="Repeat password"
          />
        </div>
      </div>
      <div className="agree-container">
        <input type="checkbox" />
        <div className="agree-text-container">
          I agree to the processing of my personal information
        </div>
      </div>
      <div className="create-button-container">
        <button className="create-button">Create</button>
        <span>
          Already have an account? <Link to="/sign-in">Sign In</Link>.
        </span>
      </div>
    </div>
  );
};

export default SignUp;
