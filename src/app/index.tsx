import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Statistics from "./statistics";
import Main from "./main";
import Auth from "./auth";
import Layout from "./layout";
import { remindSession } from "../store/auth/auth-actions";
import { useAppDispatch } from "../store/redux-hook";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(remindSession());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/statistic" element={<Statistics />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
