import { ReactNode } from "react";
import "./style.css";

interface PageLayoutProps {
  children: ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  return <div className="PageLayout">{children}</div>;
}

export default PageLayout;
