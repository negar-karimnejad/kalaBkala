import { Link } from "react-router-dom";

function NavbarLink({ title, to }) {
  return (
    <Link to={to} className="navbar__dropdown-link text-gray-500 dark:text-white">
      {title}
    </Link>
  );
}

export default NavbarLink;
