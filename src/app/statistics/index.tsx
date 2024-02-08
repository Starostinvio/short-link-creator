import { useNavigate } from "react-router-dom";
import AccessControl from "../../components/access-control";
import AuthPanel from "../../components/auth-panel";
import PageLayout from "../../components/page-layout";
import { useSelector } from "react-redux";
import { asyncSessionSelector } from "../../store/auth/async-auth-selector";
import { useEffect, useState } from "react";
import UserInfo from "../../components/user-info";
import HeadPanel from "../../components/head-panel";
import Navbar from "../../components/navbar";
import StatisticInfo from "../../containers/statistic-info";

function Statistics() {
  const [authExists, setAuthExists] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const handleAuth = (page: "login" | "signUp") => {
    navigate("/auth", { replace: false, state: page });
  };

  const state = useSelector(asyncSessionSelector);

  useEffect(() => {
    if (typeof state.authReducer.exists === "boolean") {
      setAuthExists(state.authReducer.exists);
    }
  }, [state]);

  return (
    <PageLayout>
      <HeadPanel>
        {typeof authExists === "boolean" &&
          (authExists ? (
            <>
              <Navbar title="Главная" link="/" />
              <UserInfo user={state.authReducer.user} />
            </>
          ) : (
            <AuthPanel authPage={handleAuth} currentPage={"signUp"} />
          ))}
      </HeadPanel>
      {typeof authExists === "boolean" && !authExists && (
        <AccessControl exists={false} />
      )}
      <StatisticInfo
        token={state.authReducer.token ? state.authReducer.token : ""}
        links={state.statisticsReducer.links}
      />
    </PageLayout>
  );
}

export default Statistics;
