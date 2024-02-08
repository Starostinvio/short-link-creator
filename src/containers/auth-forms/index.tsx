import { SwitchTransition, CSSTransition } from "react-transition-group";
import Login from "../../components/login";
import SignUp from "../../components/sign-up";
import { useState, useRef, useEffect, ReactNode } from "react";
import "./style.css";
import Picture from "../../img/cutUrl.png";

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
          <img className="AuthForms-img" src={Picture}></img>
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

// interface PageProps {
//   page: "login" | "signUp";
//   children: React.ReactNode;
// }

// function AuthForms({ page, children }: PageProps) {
//   const [currentPage, setCurrentPage] = useState(false);
//   const nodeRef = useRef(null);

//   useEffect(() => {
//     setCurrentPage(true);
//   }, [page]);
//   return (
//     <>
//       <div>
//         <SwitchTransition>
//           <CSSTransition
//             key={location.pathname}
//             timeout={136}
//             classNames={{
//               enter: styles.pageEnter,
//               enterActive: styles.pageEnterActive,
//               exit: styles.pageExit,
//               exitActive: styles.pageExitActive,
//             }}
//             unmountOnExit
//           >
//             {page === "login" && <Login />}
//             {page === "signUp" && <SignUp />}
//           </CSSTransition>
//         </SwitchTransition>
//       </div>
//     </>
//   );
// }

// export default AuthForms;
