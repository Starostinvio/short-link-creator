import { useOutlet, useLocation, useNavigate } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./style.css";
import { useSelector } from "react-redux";
import { asyncSessionSelector } from "../../store/auth/async-auth-selector";
import { useEffect, useState } from "react";

function Layout() {
  const [authExists, setAuthExists] = useState(false);
  const currentOutlet = useOutlet();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          timeout={250}
          classNames="page-toggle"
          unmountOnExit
        >
          {currentOutlet}
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}

export default Layout;
