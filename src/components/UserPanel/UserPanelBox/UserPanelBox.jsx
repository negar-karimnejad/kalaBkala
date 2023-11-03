import { Link } from "react-router-dom";
import "./UserPanelBox.css";

function UserPanelBox({ icon, title, to }) {
  return (
    <Link
      to={to}
      className="userpanel__box dark:text-white dark:bg-gray-900 dark:hover:bg-gray-950"
    >
      <span className="userpanel__box-icon text-5xl">{icon}</span>
      <p className="opacity-70">{title}</p>
    </Link>
  );
}

export default UserPanelBox;
