import "./style.css";
import { Link } from "react-router-dom";

interface Navbar {
  title: string;
  link: string;
}

function Navbar({ title, link }: Navbar) {
  return (
    <nav className="Navbar">
      <Link to={link} className="Navbar-link">
        {title}
      </Link>
    </nav>
  );
}

export default Navbar;
