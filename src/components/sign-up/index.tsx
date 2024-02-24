import "./style.css";
import { useAppDispatch } from "../../store/redux-hook";
import { useState, useEffect, memo } from "react";
import { signUp } from "../../store/auth/auth-actions";
import { Status } from "../../types";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { clearError } from "../../store/auth/auth-slice";

type SignUpProps = {
  status: Status;
  errorMessage: {
    emptyFields: string;
    loginFailed: string;
    signUpFailed: string;
  };
  badRequest: string | undefined;
};

function SignUp({ status, errorMessage, badRequest }: SignUpProps) {
  const [openPass, setOpenPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formValidError, setFormValidError] = useState<{
    name: boolean;
    pass: boolean;
  }>({ name: false, pass: false });
  const [requestError, setRequestError] = useState("");

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(clearError());
  // }, []);

  useEffect(() => {
    console.log("badRequest", badRequest);
    console.log("requestError", requestError);
    if (badRequest) {
      setRequestError(badRequest);
    }
  }, [badRequest]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (username && password) {
      setRequestError("");
      dispatch(signUp({ username, password }));
      return;
    }
    username || setFormValidError((state) => ({ ...state, name: true }));
    password || setFormValidError((state) => ({ ...state, pass: true }));
  };

  const handleErrorClear = (field?: string) => {
    field === "pass" &&
      setFormValidError((state) => ({ ...state, pass: false }));
    field === "name" &&
      setFormValidError((state) => ({ ...state, name: false }));
  };

  return (
    <form className="SignUp-form">
      <div className="SignUp-title-box">
        <div className="SignUp-title">Новый профиль</div>
        <div className="SignUp-subtitle">Введите Ваши данные </div>
      </div>
      <input
        className="SignUp-name"
        style={{ border: formValidError.name ? "2px solid red" : "" }}
        onFocus={() => handleErrorClear("name")}
        placeholder="Имя"
        onChange={(e) => setUsername(e.target.value)}
      ></input>

      <div className="SignUp-pass-box">
        <input
          className="SignUp-pass"
          style={{ border: formValidError.pass ? "2px solid red" : "" }}
          onFocus={() => handleErrorClear("pass")}
          type={openPass ? "text" : "password"}
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div className="SignUp-pass-icon-box">
          {openPass ? (
            <IoEyeOff onClick={() => setOpenPass(false)} />
          ) : (
            <IoEye onClick={() => setOpenPass(true)} />
          )}
        </div>
      </div>
      {formValidError.name || formValidError.pass ? (
        <div className="SignUp-error-message">{errorMessage.emptyFields}</div>
      ) : (
        ""
      )}
      {requestError === "SignUp error" ? (
        <div className="SignUp-error-message">{errorMessage.signUpFailed}</div>
      ) : (
        ""
      )}
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

export default memo(SignUp);
