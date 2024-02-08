import { ReactNode } from "react";

import "./style.css";

type HeadPanelProps = {
  children: ReactNode;
};

function HeadPanel({ children }: HeadPanelProps) {
  return <div className="HeadPanel">{children}</div>;
}

export default HeadPanel;
