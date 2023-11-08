import { PiBag, PiUser } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  setIsActive,
  useGetShoppingCartQuery,
} from "../../Redux/store/ShoppingCart";
import {
  useGetUserQuery,
  useSignOutUserMutation,
} from "../../Redux/store/users";

function HeaderUserIcon() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [shoppingCart, setShoppingCart] = useState([]);

  const { data: session, isLoading: isAuthing } = useGetUserQuery();
  const { data: shoppingCartItems, isLoading } = useGetShoppingCartQuery();
  const [signOut] = useSignOutUserMutation();

  const [theme, setTheme] = useState(localStorage.theme || "light");
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  useEffect(() => {
    const UserProducts = shoppingCartItems?.filter(
      (item) => item.userID === session?.session?.user.id
    );
    setShoppingCart(UserProducts);
    if (UserProducts) {
      let price = 0;
      UserProducts.map((product) => (price += product.price * product.counter));
      setTotalPrice(price);
    }
  }, [shoppingCartItems, session]);

  const logOutHandler = async () => {
    Swal.fire({
      title: "آیا میخواهید از حساب خود خارج شوید؟",
      position: "center",
      showConfirmButton: true,
      toast: false,
      customClass: { icon: "m-auto mt-2" },
      showDenyButton: true,
      icon: "question",
      confirmButtonText: "بله",
      denyButtonText: "نه!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          signOut();
          Swal.fire({
            customClass: { icon: "m-auto mt-4" },
            title: "با موفقیت خارج شدید",
            toast: false,
            timer: 4000,
            position: "center",
            showConfirmButton: false,
            icon: "success",
          }).then(() => {
            navigate("/");
          });
        } catch (error) {
          Swal.fire({
            title: "خروج موفقیت آمیز نبود",
            toast: true,
            timer: 3000,
            position: "top-right",
            showConfirmButton: false,
            icon: "error",
          });
          console.error(error);
        }
      }
    });
  };

  return (
    <>
      {theme === "light" ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="sm:w-9 sm:h-9 w-7 h-7 cursor-pointer grayscale transition-all duration-300 hover:grayscale-0"
          onClick={() => setTheme("dark")}
        >
          <path
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            className="stroke-yellow-500"
          ></path>
          <path
            d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
            className="stroke-yellow-500"
          ></path>
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="grayscale hover:grayscale-0  sm:w-9 sm:h-9 w-7 h-7 cursor-pointer transition-all duration-300 "
          onClick={() => setTheme("light")}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            className=" "
            d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
          ></path>
          <path
            d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
            className="fill-blue-200"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
            className="fill-blue-200"
          ></path>
        </svg>
      )}
      <span className="w-[2px] h-7 bg-gray-100 sm:mx-3 mx-1"></span>
      <div className="relative header__user-icon h-10 items-center flex">
        <Link to={!isAuthing && session.session?.access_token ? "" : "/login"}>
          <PiUser
            className={`${
              !isAuthing && session.session?.access_token
                ? "text-rose-500"
                : "dark:text-gray-200"
            } sm:text-3xl text-2xl cursor-pointer header__icon`}
          />
        </Link>
        {!isAuthing && session.session?.access_token && (
          <div className="hidden text-lg transition-all duration-500 header__user-info bg-white shadow shadow-gray-400 absolute top-8 left-1/2 transform -translate-x-7 w-64 py-3 px-6 rounded-sm dark:bg-gray-900 dark:shadow-sm dark:shadow-gray-400">
            <ul className="space-y-4 text-gray-500 dark:text-gray-300">
              <li className="font-bold border border-solid border-white border-b-gray-200 pb-2 dark:border-gray-900 dark:border-b-gray-600">
                <span className="fa fa-user-o text-xl ml-2"></span>{" "}
                {session.session?.user.user_metadata.fullname}
              </li>
              <li className="hover:font-bold">
                <Link to={"/my-account"}>
                  <span className="fa fa-home ml-2"></span>پیشخوان
                </Link>
              </li>
              <li className="hover:font-bold">
                <Link to={"/my-account/orders"}>
                  <span className="fa fa-shopping-bag ml-2"></span>سفارش ها
                </Link>
              </li>
              <li className="hover:font-bold">
                <Link to={"/my-account/address"}>
                  <span className="fa fa-map ml-2"></span>آدرس
                </Link>
              </li>
              <li className="hover:font-bold">
                <Link to={"/my-account/account-details"}>
                  <span className="fa fa-file-text ml-2"></span>جزئیات حساب
                </Link>
              </li>
              <li className="hover:font-bold border border-solid border-white border-b-gray-200 pb-2 dark:border-gray-900 dark:border-b-gray-600">
                <Link to={"/my-account/favorites"}>
                  <span className="fa fa-heart ml-2"></span>علاقه مندی ها
                </Link>
              </li>
              <li
                className="hover:font-bold cursor-pointer flex items-center"
                onClick={logOutHandler}
              >
                <span className="fa fa-sign-out ml-2"></span>
                خروج
              </li>
            </ul>
          </div>
        )}
      </div>
      <span className="w-[2px] h-7 bg-gray-100 sm:mx-3 mx-1"></span>
      <div className="flex items-center">
        <div
          className="relative cursor-pointer"
          onClick={() => dispatch(setIsActive(true))}
        >
          <PiBag className="sm:text-3xl text-2xl transition-all hover:text-gray-400 dark:text-white dark:hover:text-gray-400" />
          {!isLoading && !isAuthing && session?.session?.access_token && (
            <span className="absolute sm:w-5 sm:h-5 w-4 h-4 text-xs bg-rose-600 text-white -left-3 -top-1 pt-0.5 sm:pt-0 rounded-full flex items-center justify-center persian-font">
              {shoppingCart?.length}
            </span>
          )}
        </div>
        <p className="text-sm ms-4 text-left max-w-28 persian-font whitespace-nowrap hidden lg:block dark:text-white">
          {!isAuthing &&
            session.session?.access_token &&
            `${totalPrice.toLocaleString()} تومان`}
        </p>
      </div>
    </>
  );
}

export default HeaderUserIcon;
