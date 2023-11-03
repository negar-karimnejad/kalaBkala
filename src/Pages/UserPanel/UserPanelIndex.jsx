import { BiReceipt } from "react-icons/bi";
import { MdOutlineLocationOn, MdLogout } from "react-icons/md";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSignOutUserMutation } from "../../Redux/store/users";
import UserPanelBox from "../../components/UserPanel/UserPanelBox/UserPanelBox";
import supabase from "../../config/supabaseClient";
import Swal from "sweetalert2";
import { FiHeart } from "react-icons/fi";

function UserPanelIndex() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [signOut] = useSignOutUserMutation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

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
    <div className="md:pe-4 pe-0">
      <div className="text-xl dark:text-gray-50">
        <h2 className="font-bold mb-10">
          سلام{" "}
          <span className="text-gray-500 underline dark:text-gray-300">
            {user && user.user_metadata.fullname}
          </span>{" "}
          عزیز✌️
        </h2>
        <p className="leading-10">
          از طریق پیشخوان می‌توانید{" "}
          <Link
            to={"/my-account/orders"}
            className="text-red-600 cursor-pointer dark:text-gray-400 dark:hover:text-rose-500"
          >
            سفارش‌های اخیرتان
          </Link>{" "}
          را مشاهده،{" "}
          <Link
            to={"/my-account/address"}
            className="text-red-600 cursor-pointer dark:text-gray-400 dark:hover:text-rose-500"
          >
            آدرس‌های حمل و نقل و صورتحساب‌تان
          </Link>{" "}
          را مدیریت و{" "}
          <Link
            to={"/my-account/account-details"}
            className="text-red-600 cursor-pointer dark:text-gray-400 dark:hover:text-rose-500"
          >
            جزییات حساب کاربری
          </Link>{" "}
          و
          <Link
            to={"/my-account/account-details"}
            className="text-red-600 cursor-pointer dark:text-gray-400 dark:hover:text-rose-500"
          >
            {" "}
            کلمه عبور{" "}
          </Link>
          خود را ویرایش کنید.
        </p>
      </div>
      <div className="flex flex-wrap mt-14 gap-5">
        <div className="w-full lg:w-3/12 md:w-4/12 flex-grow">
          <UserPanelBox to={"orders"} icon={<BiReceipt />} title="سفارش ها" />
        </div>
        <div className="w-full lg:w-3/12 md:w-4/12 flex-grow">
          <UserPanelBox
            to={"address"}
            icon={<MdOutlineLocationOn />}
            title="آدرس"
          />
        </div>
        <div className="w-full lg:w-3/12 md:w-4/12 flex-grow">
          <UserPanelBox
            to={"account-details"}
            icon={<RiAccountPinCircleLine />}
            title="جزئیات حساب"
          />
        </div>
        <div className="w-full lg:w-3/12 md:w-4/12 flex-grow">
          <UserPanelBox
            to={"favorites"}
            icon={<FiHeart />}
            title="علاقه مندی ها"
          />
        </div>
        <div className="w-full lg:w-3/12 md:w-4/12 flex-grow">
          <div className="userpanel__box dark:bg-gray-900 dark:text-white dark:hover:bg-gray-950" onClick={logOutHandler}>
            <span className="userpanel__box-icon text-5xl">
              <MdLogout />
            </span>
            <p className="opacity-70">خروج</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPanelIndex;
