import "./header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <Link className="link" to="/articlesList">
        <div className="name-tittle">
          <span>Realworld Blog</span>
        </div>
      </Link>
      <div className="sing-container">
        <Link className="link" to="/sign-in">
          <button className="sing-in">Sing in</button>
        </Link>
        <Link className="link" to="/sign-up">
          <button className="sing-up">Sing up</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
