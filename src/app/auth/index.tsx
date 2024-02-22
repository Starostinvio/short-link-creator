import { useLocation, useNavigate } from "react-router-dom";
import AuthPanel from "../../components/auth-panel";
import Login from "../../components/login";
import PageLayout from "../../components/page-layout";
import SignUp from "../../components/sign-up";
import AuthForms from "../../containers/auth-forms";
import { useState, useEffect } from "react";
import HeadPanel from "../../components/head-panel";
import { useDispatch, useSelector } from "react-redux";
import { asyncSessionSelector } from "../../store/auth/async-auth-selector";
import TestEnter from "../../components/test-enter";

function Auth() {
  const [currentPage, setCurrentPage] = useState<"login" | "signUp" | "">("");
  const [authExists, setAuthExists] = useState<boolean | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const state = useSelector(asyncSessionSelector);

  useEffect(() => {
    if (location.state) {
      setCurrentPage(location.state);
    }
  }, [location]);

  useEffect(() => {
    if (currentPage === "signUp" && state.authReducer.status === "received") {
      setCurrentPage("login");
    }

    if (typeof state.authReducer.exists === "boolean") {
      state.authReducer.exists
        ? navigate("/")
        : setAuthExists(state.authReducer.exists);
    }
  }, [state]);

  const handleAuth = (page: "login" | "signUp") => {
    setCurrentPage(page);
  };

  return (
    <>
      {typeof authExists === "boolean" && (
        <PageLayout>
          <HeadPanel>
            <AuthPanel authPage={handleAuth} currentPage={currentPage} />
          </HeadPanel>
          <AuthForms page={currentPage}>
            {currentPage === "login" && (
              <Login
                status={state.authReducer.status}
                errorMessage={state.authReducer.error}
              />
              // <TestEnter />
            )}
            {currentPage === "signUp" && (
              <SignUp status={state.authReducer.status} />
            )}
          </AuthForms>
        </PageLayout>
      )}
    </>
  );
}

export default Auth;
