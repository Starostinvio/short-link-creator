import "./style.css";
import { useState } from "react";
import { login } from "../../store/auth/auth-actions";
import { useAppDispatch } from "../../store/redux-hook";
import { Status } from "../../types";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

type LoginProps = {
  status: Status;
  errorMessage: string | undefined;
};

function Login({ status, errorMessage }: LoginProps) {
  const [openPass, setOpenPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (username && password) {
      dispatch(login({ username, password }));
    }
  };

  return (
    <form className="Login-form">
      <div className="Login-title">Вход в профиль</div>
      <div className="Login-subtitle">Введите Ваши данные </div>

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
      {/* <button
        className="Login-submit"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        {status === "loading" ? <div className="loader"></div> : ""}
        <div>Войти</div> <IoIosArrowForward className="Login-submit-icon" />
      </button> */}
    </form>
  );
}

export default Login;
