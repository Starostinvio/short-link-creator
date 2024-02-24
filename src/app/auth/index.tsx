import { useLocation, useNavigate } from "react-router-dom";
import AuthPanel from "../../components/auth-panel";
import Login from "../../components/login";
import PageLayout from "../../components/page-layout";
import SignUp from "../../components/sign-up";
import AuthForms from "../../containers/auth-forms";
import { useState, useEffect } from "react";
import HeadPanel from "../../components/head-panel";
import { useSelector } from "react-redux";
import { asyncSessionSelector } from "../../store/auth/async-auth-selector";
import { clearError } from "../../store/auth/auth-slice";
import { useAppDispatch } from "../../store/redux-hook";

const errorMessage = {
  emptyFields: "Пожалуйста, заполните все обязательные поля",
  loginFailed:
    "Не парвильно введены имя или пароль. Пожалуйста, попробуйте снова",
  signUpFailed: "Пользователь с таким именем уже существует",
};

function Auth() {
  const [currentPage, setCurrentPage] = useState<"login" | "signUp" | "">("");
  const [authExists, setAuthExists] = useState<boolean | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const state = useSelector(asyncSessionSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (location.state) {
      setCurrentPage(location.state.form);
    }
  }, [location]);

  useEffect(() => {
    dispatch(clearError());
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === "signUp" && state.authReducer.status === "received") {
      setCurrentPage("login");
    }

    if (state.authReducer.exists !== null) {
      state.authReducer.exists ? redirect() : handleComponentRender();
    }
  }, [state]);

  function redirect() {
    if (!!location.state?.previousLocation) {
      navigate(location.state.previousLocation);
      return;
    }
    console.log("redirect");
    navigate("/");
  }
  function handleComponentRender() {
    setAuthExists(state.authReducer.exists);
    if (!currentPage) setCurrentPage("login");
  }

  const handleAuth = (page: "login" | "signUp") => {
    setCurrentPage(page);
  };

  return (
    <>
      {authExists !== null && (
        <PageLayout>
          <HeadPanel>
            <AuthPanel authPage={handleAuth} currentPage={currentPage} />
          </HeadPanel>
          <AuthForms page={currentPage}>
            {currentPage === "login" && (
              <Login
                status={state.authReducer.status}
                errorMessage={errorMessage}
                badRequest={state.authReducer.error}
              />
            )}
            {currentPage === "signUp" && (
              <SignUp
                status={state.authReducer.status}
                errorMessage={errorMessage}
                badRequest={state.authReducer.error}
              />
            )}
          </AuthForms>
        </PageLayout>
      )}
    </>
  );
}

export default Auth;
