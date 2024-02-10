import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useRef, ReactNode } from "react";
import picture from "../../img/cutUrl.png";
import "./style.css";

interface PageProps {
  children: ReactNode;
  page: "login" | "signUp" | "";
}

function AuthForms({ children, page }: PageProps) {
  const nodeRef = useRef(null);

  return (
    <>
      <div className="AuthForms">
        <div className="AuthForms-img-panel">
          <img className="AuthForms-img" src={picture}></img>
        </div>

        <SwitchTransition>
          <CSSTransition
            key={page}
            timeout={400}
            classNames="alert"
            unmountOnExit
            nodeRef={nodeRef}
          >
            <div className="AuthForms-panel" ref={nodeRef}>
              {children}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  );
}

export default AuthForms;
