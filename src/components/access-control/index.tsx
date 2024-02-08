import { CSSTransition } from "react-transition-group";
import { useState, useRef, useEffect } from "react";
import "./style.css";

type AccessControlProps = {
  exists: boolean;
};

function AccessControl({ exists }: AccessControlProps) {
  const [openModal, setOpenModal] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setOpenModal(true);
  }, [exists]);

  return (
    <>
      <div className="AccessControl">
        <CSSTransition
          in={openModal}
          timeout={500}
          classNames="alertInfo"
          unmountOnExit
          nodeRef={nodeRef}
        >
          <div ref={nodeRef} className="AccessControl-panel">
            <h1>Чтобы продолжить войдите или зарегестрируйтесь.</h1>
          </div>
        </CSSTransition>
      </div>
    </>
  );
}

export default AccessControl;
