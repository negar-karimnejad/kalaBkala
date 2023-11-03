import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSignOutUserMutation } from "../../../Redux/store/users";

function UserPanelSidebar() {

  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("");
  const [signOut] = useSignOutUserMutation();

  const clickHandler = (e) => {
    setActiveItem(e.target.id);
  };

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
      <h2 className="py-3 font-bold text-2xl border border-white border-solid border-b-gray-300 dark:border-gray-900 dark:border-b-gray-700">
        حساب کاربری من
      </h2>
      <ul className="font-bold py-3">
        <li
          className={`${
            activeItem === "index" ? "bg-gray-100 dark:bg-gray-800" : ""
          } p-3 text-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-800`}
          onClick={clickHandler}
        >
          <Link id="index" to={"/my-account"}>
            پیشخوان
          </Link>
        </li>
        <li
          className={`${
            activeItem === "orders" ? "bg-gray-100 dark:bg-gray-800" : ""
          } p-3 text-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-800`}
          onClick={clickHandler}
        >
          <Link id="orders" to={"orders"}>
            سفارش ها
          </Link>
        </li>
        <li
          className={`${
            activeItem === "address" ? "bg-gray-100 dark:bg-gray-800" : ""
          } p-3 text-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-800`}
          onClick={clickHandler}
        >
          <Link id="address" to={"address"}>
            آدرس
          </Link>
        </li>
        <li
          className={`${
            activeItem === "account" ? "bg-gray-100 dark:bg-gray-800" : ""
          } p-3 text-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-800`}
          onClick={clickHandler}
        >
          <Link id="account" to={"account-details"}>
            جزئیات حساب
          </Link>
        </li>
        <li
          className={`${
            activeItem === "favorites" ? "bg-gray-100 dark:bg-gray-800" : ""
          } p-3 text-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-800`}
          onClick={clickHandler}
        >
          <Link id="favorites" to={"favorites"}>
            علاقه مندی
          </Link>
        </li>
        <li
          className={`${
            activeItem === "exit" ? "bg-gray-100 dark:bg-gray-800" : ""
          } p-3 text-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-800`}
          onClick={clickHandler}
        >
          <div className="cursor-pointer" onClick={logOutHandler} id="exit">
            خروج
          </div>
        </li>
      </ul>
    </>
  );
}
export default UserPanelSidebar;
