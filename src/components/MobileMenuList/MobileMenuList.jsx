import { IoIosArrowBack } from "react-icons/io";
import { PiUser } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setIsShow } from "../../Redux/store/mobileMenu";
import { useGetUserQuery } from "../../Redux/store/users";

function MobileMenuList({
  isShowDropDownMenu,
  dropdownTitle,
  setDropdownTitle,
  setIsShowDropDownMenu,
}) {
  const dispatch = useDispatch();
  const { data: session, isLoading: isAuthing } = useGetUserQuery();

  const clickOnMobArrow = async (e) => {
    setDropdownTitle(e.target.id);
    if (e.target.id === dropdownTitle) {
      setIsShowDropDownMenu(false);
    } else {
      setIsShowDropDownMenu(true);
    }
  };

  function handleLinkClick() {
    dispatch(setIsShow(false));
  }

  return (
    <ul className="pt-2 font-bold dark:font-medium">
      <li className="px-5 py-4 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
        <a href="">خانه</a>
      </li>
      <li className="relative px-5 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
        <div className="flex justify-between items-center">
          <Link
            onClick={handleLinkClick}
            to={"/products/category/perfume"}
            className="w-full py-4 me-5 border border-solid border-white border-e-gray-200 dark:border-gray-900"
          >
            خرید ادکلن
          </Link>
          <IoIosArrowBack
            id="perfume"
            className="p-1 text-3xl cursor-pointer text-gray-500"
            onClick={(e) => clickOnMobArrow(e)}
          />
        </div>
        <div
          className={`${
            isShowDropDownMenu && dropdownTitle === "perfume"
              ? "show-dropdown"
              : ""
          } header__dropdown-menu`}
        >
          <ul className="border border-solid border-white border-t-gray-200 dark:border-gray-900 dark:border-t-gray-700">
            <li className="text-gray-500 px-5 py-4 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
              <Link
                onClick={handleLinkClick}
                to={"/products/category/perfume/زنانه"}
              >
                ادکلن زنانه
              </Link>
            </li>
            <li className="text-gray-500 px-5 py-4">
              <Link
                onClick={handleLinkClick}
                to={"/products/category/perfume/مردانه"}
              >
                ادکلن مردانه
              </Link>
            </li>
          </ul>
        </div>
      </li>
      <li className="relative px-5 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
        <div className="flex justify-between items-center">
          <Link
            onClick={handleLinkClick}
            to={"/products/category/skin-care"}
            className="w-full py-4 me-5 border border-solid border-white border-e-gray-200 dark:border-gray-900"
          >
            لوازم مراقبتی پوست
          </Link>
          <IoIosArrowBack
            id="care"
            className="p-1 text-3xl cursor-pointer text-gray-500"
            onClick={(e) => clickOnMobArrow(e)}
          />
        </div>
        <div
          className={`${
            isShowDropDownMenu && dropdownTitle === "care"
              ? "show-dropdown"
              : ""
          } header__dropdown-menu`}
        >
          <ul className="border border-solid border-white border-t-gray-200 dark:border-gray-900 dark:border-t-gray-700">
            <li className="text-gray-500 px-5 py-4 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
              <Link
                onClick={handleLinkClick}
                to={"/products/category/skin-care/پوست"}
              >
                پاک کننده پوست
              </Link>
            </li>
            <li className="text-gray-500 px-5 py-4 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
              <Link
                onClick={handleLinkClick}
                to={"/products/category/skin-care/کرم"}
              >
                کرم‌ها
              </Link>
            </li>
            <li className="text-gray-500 px-5 py-4 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
              <Link
                onClick={handleLinkClick}
                to={"/products/category/skin-care/لوسیون"}
              >
                لوسیون بدن
              </Link>
            </li>
            <li className="text-gray-500 px-5 py-4 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
              <Link
                onClick={handleLinkClick}
                to={"/products/category/skin-care/ماسک"}
              >
                ماسک صورت
              </Link>
            </li>
            <li className="text-gray-500 px-5 py-4 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
              <Link
                onClick={handleLinkClick}
                to={"/products/category/skin-care/بالم"}
              >
                بالم لب
              </Link>
            </li>
            <li className="text-gray-500 px-5 py-4 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
              <Link
                onClick={handleLinkClick}
                to={"/products/category/skin-care/سرم"}
              >
                سرم پوست
              </Link>
            </li>
            <li className="text-gray-500 px-5 py-4 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
              <Link
                onClick={handleLinkClick}
                to={"/products/category/skin-care/ناخن"}
              >
                تقویت کننده ناخن
              </Link>
            </li>
            <li className="text-gray-500 px-5 py-4 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
              <Link
                onClick={handleLinkClick}
                to={"/products/category/skin-care/لایه-بردار"}
              >
                لایه بردار پوست
              </Link>
            </li>
          </ul>
        </div>
      </li>
      <li className="relative px-5 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
        <div className="flex justify-between items-center">
          <Link
            onClick={handleLinkClick}
            to={"/products/category/hygienic"}
            className="w-full py-4 me-5 border border-solid border-white border-e-gray-200 dark:border-gray-900"
          >
            لوازم بهداشتی
          </Link>
          <IoIosArrowBack
            id="hygienic"
            className="p-1 text-3xl cursor-pointer text-gray-500"
            onClick={(e) => clickOnMobArrow(e)}
          />
        </div>
        <div
          className={`${
            isShowDropDownMenu && dropdownTitle === "hygienic"
              ? "show-dropdown"
              : ""
          } header__dropdown-menu`}
        >
          <ul className="border border-solid border-white border-t-gray-200 dark:border-gray-900 dark:border-t-gray-700">
            <li className="text-gray-500 px-5 py-4 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
              <Link
                onClick={handleLinkClick}
                to={"/products/category/hygienic/تعریق"}
              >
                ضد تعریق
              </Link>
            </li>
            <li className="text-gray-500 px-5 py-4">
              <Link
                onClick={handleLinkClick}
                to={"/products/category/hygienic/ژل"}
              >
                ژل بهداشتی
              </Link>
            </li>
          </ul>
        </div>
      </li>
      <li className="relative px-5 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
        <div className="flex justify-between items-center">
          <Link
            onClick={handleLinkClick}
            to={"/products/category/hair-care"}
            className="w-full py-4 me-5 border border-solid border-white border-e-gray-200 dark:border-gray-900"
          >
            لوازم مراقبتی مو
          </Link>
          <IoIosArrowBack
            id="hair"
            className="p-1 text-3xl cursor-pointer text-gray-500"
            onClick={(e) => clickOnMobArrow(e)}
          />
        </div>
        <div
          className={`${
            isShowDropDownMenu && dropdownTitle === "hair"
              ? "show-dropdown"
              : ""
          } header__dropdown-menu`}
        >
          <ul className="border border-solid border-white border-t-gray-200 dark:border-gray-900 dark:border-t-gray-700">
            <li className="text-gray-500 px-5 py-4 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
              <Link
                onClick={handleLinkClick}
                to={"/products/category/hair-care/شامپو"}
              >
                شامپو مو
              </Link>
            </li>
            <li className="text-gray-500 px-5 py-4 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
              <Link
                onClick={handleLinkClick}
                to={"/products/category/hair-care/کرم-مو"}
              >
                کرم مو
              </Link>
            </li>
            <li className="text-gray-500 px-5 py-4 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
              <Link
                onClick={handleLinkClick}
                to={"/products/category/hair-care/سرم-مو"}
              >
                سرم مو
              </Link>
            </li>
            <li className="text-gray-500 px-5 py-4 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
              <Link
                onClick={handleLinkClick}
                to={"/products/category/hair-care/ماسک-مو"}
              >
                ماسک مو
              </Link>
            </li>
          </ul>
        </div>
      </li>
      <li className="relative px-5 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
        <div className="flex justify-between items-center">
          <Link
            onClick={handleLinkClick}
            to={"/products/category/sunglasses"}
            className="w-full py-4 me-5 border border-solid border-white border-e-gray-200 dark:border-gray-900"
          >
            عینک آفتابی
          </Link>
          <IoIosArrowBack
            id="sunglass"
            className="p-1 text-3xl cursor-pointer text-gray-500"
            onClick={(e) => clickOnMobArrow(e)}
          />
        </div>
        <div
          className={`${
            isShowDropDownMenu && dropdownTitle === "sunglass"
              ? "show-dropdown"
              : ""
          } header__dropdown-menu`}
        >
          <ul className="border border-solid border-white border-t-gray-200 dark:border-gray-900 dark:border-t-gray-700">
            <li className="text-gray-500 px-5 py-4 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
              <Link
                onClick={handleLinkClick}
                to={"/products/category/sunglasses/زنانه"}
              >
                عینک آفتابی زنانه
              </Link>
            </li>
            <li className="text-gray-500 px-5 py-4">
              <Link
                onClick={handleLinkClick}
                to={"/products/category/sunglasses/مردانه"}
              >
                عینک آفتابی مردانه
              </Link>
            </li>
          </ul>
        </div>
      </li>
      <li className="px-5 py-4 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
        <Link onClick={handleLinkClick} to={"/درج-شکایت"}>
          درج شکایت
        </Link>
      </li>
      <li className="px-5 py-4 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
        <Link onClick={handleLinkClick} to={"/contact-us"}>
          تماس با ما
        </Link>
      </li>
      <li className="px-5 py-4 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
        <Link
          onClick={handleLinkClick}
          to={`${session?.session?.access_token ? "" : "login"}`}
          className="flex"
        >
          <PiUser className="text-xl me-1" />
          ورود / ثبت نام
        </Link>
      </li>
    </ul>
  );
}

export default MobileMenuList;
