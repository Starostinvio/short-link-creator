import "./style.css";
import { useState, useEffect, memo } from "react";
import { login } from "../../store/auth/auth-actions";
import { useAppDispatch } from "../../store/redux-hook";
import { Status } from "../../types";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { clearError } from "../../store/auth/auth-slice";

type LoginProps = {
  status: Status;
  errorMessage: { emptyFields: string; loginFailed: string };
  badRequest: string | undefined;
};

function Login({ status, errorMessage, badRequest }: LoginProps) {
  const [openPass, setOpenPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formValidError, setFormValidError] = useState<{
    name: boolean;
    pass: boolean;
  }>({ name: false, pass: false });

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(clearError());
  // }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (username && password) {
      dispatch(login({ username, password }));
      return;
    }
    username || setFormValidError((state) => ({ ...state, name: true }));
    password || setFormValidError((state) => ({ ...state, pass: true }));
  };

  return (
    <form className="Login-form">
      <div className="Login-title-box">
        <div className="Login-title">Вход в профиль</div>
        <div className="Login-subtitle">Введите Ваши данные </div>
      </div>
      <input
        className="Login-name"
        style={{ border: formValidError.name ? "2px solid red" : "" }}
        onFocus={() =>
          setFormValidError((state) => ({ ...state, name: false }))
        }
        type="text"
        placeholder="Имя"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <div className="Login-pass-box">
        <input
          className="Login-pass"
          style={{ border: formValidError.pass ? "2px solid red" : "" }}
          onFocus={() =>
            setFormValidError((state) => ({ ...state, pass: false }))
          }
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
      {formValidError.name || formValidError.pass ? (
        <div className="Login-error-message">{errorMessage.emptyFields}</div>
      ) : (
        ""
      )}
      {badRequest === "Login error" ? (
        <div className="Login-error-message">{errorMessage.loginFailed}</div>
      ) : (
        ""
      )}
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

export default memo(Login);
