import "./style.css";
import { useState } from "react";
import { login } from "../../store/auth/auth-actions";
import { useAppDispatch } from "../../store/redux-hook";
import { useSelector } from "react-redux";
import { asyncSessionSelector } from "../../store/auth/async-auth-selector";
import { Status } from "../../types";
type LoginProps = {
  status: Status;
};

function Login({ status }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const state = useSelector(asyncSessionSelector);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (username && password) {
      dispatch(login({ username, password }));
    }
  };

  return (
    <form className="Login-form">
      <div className="Login-title">Вход в профиль</div>

      <input
        className="Login-name"
        placeholder="Имя"
        onChange={(e) => setUsername(e.target.value)}
      ></input>

      <input
        className="Login-pass"
        placeholder="Пароль"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button
        className="Login-submit"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        {status === "loading" ? <div className="loader"></div> : ""}
        ВОЙТИ
      </button>
    </form>
  );
}

export default Login;
