import { Link } from "react-router-dom";

function OrderingModal({ isShowOrderingModal, setIsShowOrderingModal }) {
  return (
    <div
      className={`${
        isShowOrderingModal ? "visible bg-opacity-50" : "invisible bg-opacity-0"
      } lg:hidden transition-all duration-700 fixed bg-black flex items-center justify-center w-full h-full z-10`}
    >
      <div
        className={`${
          isShowOrderingModal ? "top-0" : "-top-full"
        } transition-all duration-700 relative overflow-hidden flex flex-col items-center sm:justify-center md:w-6/12 sm:w-8/12 sm:h-96 w-full h-full py-7 bg-rose-100 sm:rounded-md dark:bg-gray-900 dark:text-gray-200`}
      >
        <span
          className="fa fa-close absolute right-8 top-8 cursor-pointer opacity-50"
          onClick={() => setIsShowOrderingModal(false)}
        ></span>
        <div className="w-full flex items-center justify-center">
          <i
            className="fa fa-sort-amount-asc ml-2 text-gray-600 dark:text-gray-300"
            aria-hidden="true"
          ></i>
          <span className="text-xl dark:text-gray-50">ترتیب نمایش:</span>
        </div>
        <ul className="cursor-pointer bg-white text-lg w-full flex flex-col text-center text-gray-600 mt-5 dark:bg-gray-800 dark:text-gray-300">
          <Link to={`/products/order/most-visited`}>
            <li
              className="sm:py-2 py-4 border-2 border-solid border-white border-b-gray-50 hover:bg-rose-50 hover:shadow-md hover:font-bold hover:text-black dark:border-gray-700 dark:hover:bg-gray-900 dark:hover:text-gray-300"
              onClick={() => setIsShowOrderingModal(false)}
            >
              پربازدیدترین
            </li>
          </Link>
          <Link to={`/products/order/cheapest`}>
            <li
              className="sm:py-2 py-4 border-2 border-solid border-white border-b-gray-50 hover:bg-rose-50 hover:shadow-md hover:font-bold hover:text-black dark:border-gray-700 dark:hover:bg-gray-900 dark:hover:text-gray-300"
              onClick={() => setIsShowOrderingModal(false)}
            >
              ارزان ترین
            </li>
          </Link>
          <Link to={`/products/order/expensive`}>
            <li
              className="sm:py-2 py-4 border-2 border-solid border-white border-b-gray-50 hover:bg-rose-50 hover:shadow-md hover:font-bold hover:text-black dark:border-gray-700 dark:hover:bg-gray-900 dark:hover:text-gray-300"
              onClick={() => setIsShowOrderingModal(false)}
            >
              گران ترین
            </li>
          </Link>
          <Link to={`/products/order/newest`}>
            <li
              className="sm:py-2 py-4 border-2 border-solid border-white border-b-gray-50 hover:bg-rose-50 hover:shadow-md hover:font-bold hover:text-black dark:border-gray-700 dark:hover:bg-gray-900 dark:hover:text-gray-300"
              onClick={() => setIsShowOrderingModal(false)}
            >
              جدیدترین
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default OrderingModal;
