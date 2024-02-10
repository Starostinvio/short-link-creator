import "./style.css";
import { useState } from "react";
import { login } from "../../store/auth/auth-actions";
import { useAppDispatch } from "../../store/redux-hook";
import { useSelector } from "react-redux";
import { asyncSessionSelector } from "../../store/auth/async-auth-selector";
import { Status } from "../../types";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useForm, FieldError } from "react-hook-form";

type LoginProps = {
  status: Status;
  errorMessage: string | undefined;
};

function Login({ status, errorMessage }: LoginProps) {
  const [openPass, setOpenPass] = useState(false);
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
      <div className="Login-subtitle">Введите cвои данные ниже</div>
      {/* {status === "rejected" && <div>{errorMessage}</div>} */}
      <input
        className="Login-name"
        type="text"
        placeholder="Имя"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <div className="Login-pass-box">
        <input
          className="Login-pass"
          type={openPass ? "text" : "password"}
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div className="Login-pass-icon-box">
          {openPass ? (
            <IoEyeOff onClick={() => setOpenPass(false)} />
          ) : (
            <IoEye
              className="Login-pass-open"
              onClick={() => setOpenPass(true)}
            />
          )}
        </div>
      </div>
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
