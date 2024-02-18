import { ReactNode } from "react";
import "./style.css";

type HeadPanelProps = {
  children: ReactNode;
};

function HeadPanel({ children }: HeadPanelProps) {
  return (
    <>
      <div className="HeadPanel">
        <div className="HeadPanel-logo-box">
          <span className="HeadPanel-logo">smaller</span>
        </div>
        {children}
      </div>
    </>
  );
}

export default HeadPanel;
