import "./style.css";
import { useAppDispatch } from "../../store/redux-hook";
import { useSelector } from "react-redux";
import { asyncSessionSelector } from "../../store/auth/async-auth-selector";
import { useState } from "react";
import { signUp } from "../../store/auth/auth-actions";
import { Status } from "../../types";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

type SignUpProps = {
  status: Status;
};

function SignUp({ status }: SignUpProps) {
  const [openPass, setOpenPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const state = useSelector(asyncSessionSelector);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (username && password) {
      dispatch(signUp({ username, password }));
    }
  };

  return (
    <form className="SignUp-form">
      <div className="SignUp-title">Регистрация</div>

      <input
        className="SignUp-name"
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
        <div className="Login-path-icon-box">
          {openPass ? (
            <IoEyeOff onClick={() => setOpenPass(false)} />
          ) : (
            <IoEye
              className="Login-path-open"
              onClick={() => setOpenPass(true)}
            />
          )}
        </div>
      </div>
      <button
        className="SignUp-submit"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        {status === "loading" ? <div className="loader"></div> : ""}
        СОЗДАТЬ
      </button>
    </form>
  );
}

export default SignUp;
