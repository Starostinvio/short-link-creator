import { useNavigate } from "react-router-dom";
import AccessControl from "../../components/access-control";
import AuthPanel from "../../components/auth-panel";
import GetShortLink from "../../components/get-short-link";
import Login from "../../components/login";
import PageLayout from "../../components/page-layout";
import SignUp from "../../components/sign-up";
import { useSelector } from "react-redux";
import { asyncSessionSelector } from "../../store/auth/async-auth-selector";
import { useEffect, useState } from "react";
import UserInfo from "../../components/user-info";
import HeadPanel from "../../components/head-panel";
import Navbar from "../../components/navbar";
import ShortLinkPanel from "../../components/short-link-panel";
import { useAppDispatch } from "../../store/redux-hook";
import { remindSession } from "../../store/auth/auth-actions";

function Main() {
  const [authExists, setAuthExists] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleAuth = (page: "login" | "signUp") => {
    navigate("/auth", { replace: false, state: page });
  };

  const state = useSelector(asyncSessionSelector);

  useEffect(() => {
    if (state.authReducer.exists !== null) {
      setAuthExists(state.authReducer.exists);
    }
  }, [state]);

  useEffect(() => {
    dispatch(remindSession());
  }, []);

  return (
    <>
      <PageLayout>
        <HeadPanel>
          {authExists !== null &&
            (authExists ? (
              <>
                <Navbar title="Статистика" link="/statistic" />
                <UserInfo user={state.authReducer.user} />
              </>
            ) : (
              <AuthPanel authPage={handleAuth} currentPage={"signUp"} />
            ))}
        </HeadPanel>
        {authExists !== null && !authExists && <AccessControl exists={false} />}
        <GetShortLink
          token={state.authReducer.token ? state.authReducer.token : ""}
        />
        {state.shortLinkReducer.shortLink && (
          <ShortLinkPanel shortUrl={state.shortLinkReducer.shortLink} />
        )}
      </PageLayout>
    </>
  );
}

export default Main;
