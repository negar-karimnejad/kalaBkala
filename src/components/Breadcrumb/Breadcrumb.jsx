import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

function Breadcrumb({ links }) {
  return (
    <nav className="flex p-5" aria-label="Breadcrumb">
      <ul className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex ml-1">
          <Link
            to={"/"}
            className="inline-flex text-sm font-medium text-gray-700 hover:text-rose-600 dark:text-gray-400 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3 ml-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            خانه
          </Link>
        </li>
        {links.map((link) => (
          <li className="flex items-center" key={link.id}>
            <IoIosArrowBack className="dark:text-white ml-1" />
            <Link
              to={link.to}
              className="text-sm font-medium text-gray-700 hover:text-rose-600 dark:text-gray-400 dark:hover:text-white"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Breadcrumb;
