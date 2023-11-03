import { Link } from "react-router-dom";

function Pagination({ page, pagesCount }) {
  return (
    <div className={`${page ? "" : "hidden"}`}>
      <div className="mt-14 bg-white p-4 flex justify-center flex-wrap dark:bg-gray-800">
        <nav aria-label="Page navigation">
          <ul className="inline-flex items-center justify-center">
            <li>
              {page > 1 && (
                <Link
                  to={`/products/${Number(page) - 1}`}
                  className="h-10 px-5 text-rose-600 transition-colors duration-150 rounded-r-lg focus:shadow-outline "
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              )}
            </li>
            {Array(pagesCount)
              .fill(0)
              .map((item, index) => (
                <li
                  className="mx-2 h-10 text-rose-600 font-bold transition-colors duration-150 flex items-center focus:shadow-outline"
                  key={index}
                >
                  {index + 1 === Number(page) ? (
                    <Link
                      to={`/products/${index + 1}`}
                      className="flex items-center h-10 px-5 text-white transition-colors duration-150 bg-rose-600 border border-r-0 border-rose-600 focus:shadow-outline"
                    >
                      {index + 1}
                    </Link>
                  ) : (
                    <Link
                      to={`/products/${index + 1}`}
                      className="flex items-center h-10 px-5 text-rose-600 transition-colors duration-150 dark:hover:text-rose-600 dark:text-gray-200"
                    >
                      {index + 1}
                    </Link>
                  )}
                </li>
              ))}
            <li>
              {page < pagesCount && (
                <Link
                  to={`/products/${Number(page) + 1}`}
                  className="h-10 px-5 text-rose-600 transition-colors duration-150 rounded-l-lg focus:shadow-outline dark:text-gray-200"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Pagination;
