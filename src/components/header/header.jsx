import "./header.scss";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRedirect } from "../store/articleReduser";

const LogOutHeader = () => {
  return (
    <div className="sing-container">
      <Link className="link" to="/sign-in">
        <div className="sing-in">Sing in</div>
      </Link>
      <Link className="link" to="/sign-up">
        <div className="sing-up">Sing up</div>
      </Link>
    </div>
  );
};

const Header = () => {
  const user = JSON.parse(localStorage.getItem("token"));
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const redirect = useSelector((state) => state.articles.redirect);

  const LogInHeader = () => {
    return (
      <div className="actions-container">
        <Link className="link" to="/new-article">
          <div className="create-article">Create article</div>
        </Link>
        <Link className="link" to="/edit-profile">
          <div className="user-info-container">
            <div className="user-name">{user.user?.username}</div>
            <div className="user-avatar">
              <img src={user.user?.image} alt="" />
            </div>
          </div>
        </Link>
        <button
          className="log-out"
          onClick={() => {
            const confirmBox = window.confirm("Вы действительно хотите выйти?");
            if (confirmBox === true) {
              dispatch(getRedirect(true));
              localStorage.clear();
              window.location.reload();
            }
          }}
        >
          Log Out
        </button>
      </div>
    );
  };

  if (redirect) {
    <Redirect to="/articlesList" />;
  }
  return (
    <div className="header-container">
      <Link className="link" to="/articlesList">
        <div className="name-tittle">
          <span>Realworld Blog</span>
        </div>
      </Link>
      {!token && <LogOutHeader />}
      {token && <LogInHeader />}
    </div>
  );
};

export default Header;
