import "./style.css";
import { useAppDispatch } from "../../store/redux-hook";
import { useSelector } from "react-redux";
import { asyncSessionSelector } from "../../store/auth/async-auth-selector";
import { useState } from "react";
import { signUp } from "../../store/auth/auth-actions";
import { Status } from "../../types";

type SignUpProps = {
  status: Status;
};

function SignUp({ status }: SignUpProps) {
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

      <input
        className="SignUp-pass"
        placeholder="Пароль"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
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
