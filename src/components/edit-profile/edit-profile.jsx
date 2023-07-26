import { useForm } from "react-hook-form";
import "./edit-profile.scss";

const EditProfile = () => {
  const token = JSON.parse(localStorage.getItem("token"))?.user.token;
  const user = JSON.parse(localStorage.getItem("token"));
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    const user = {
      email: data.email,
      username: data.username,
      bio: data.password,
      image: null,
    };
    console.log(JSON.stringify(user));
    fetch("https://blog.kata.academy/api/user", {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((data) => data.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    reset();
  };

  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                placeholder={user?.user.username}
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
                placeholder={user?.user.email}
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
              New password
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
                placeholder="New password"
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
              Avatar image (url)
              <input
                className="user-avatar"
                type="img"
                placeholder="Avatar image"
                {...register("image")}
              />
            </label>
          </div>
        </div>
        <div className="create-button-container">
          <button className="create-button">Create</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
