import { useOutlet, useLocation } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./style.css";

function Layout() {
  const currentOutlet = useOutlet();
  const location = useLocation();

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
