import { RiArrowDownSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import NavbarItem from "../NavbarItem/NavbarItem";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="bg-white hidden lg:block border border-solid border-white border-b-gray-200 h-16 dark:border-gray-800 dark:border-b-gray-600 dark:bg-gray-800">
      <ul className="flex items-center h-full dark:text-white">
        <li className="mx-3 flex items-center relative navbar__item h-full">
          <Link to={"/"} className="navbar__link text-sm">
            خانه
          </Link>
        </li>
        <li className="mx-3 flex items-center relative navbar__item h-full">
          <Link
            to={"/products/category/perfume"}
            className="navbar__link text-sm"
          >
            خرید ادکلن
          </Link>
          <RiArrowDownSLine className="text-gray-400 ms-0.5" />
          <div className="z-10 absolute top-12 right-0 shadow py-3 px-5 w-48 hidden navbar__dropdown-menu bg-white dark:bg-gray-900">
            <ul>
              <NavbarItem
                title={"ادکلن زنانه"}
                to={"/products/category/perfume/زنانه"}
              />
              <NavbarItem
                title={"ادکلن مردانه"}
                to={"/products/category/perfume/مردانه"}
              />
            </ul>
          </div>
        </li>
        <li className="mx-3 flex items-center relative navbar__item h-full">
          <Link
            to={"/products/category/skin-care"}
            className="navbar__link text-sm"
          >
            لوازم مراقبتی پوست
          </Link>
          <RiArrowDownSLine className="text-gray-400 ms-0.5" />
          <div className="z-10 absolute top-12 right-0 shadow py-3 px-5 w-48 hidden navbar__dropdown-menu bg-white dark:bg-gray-900">
            <ul>
              <NavbarItem
                title={"پاک کننده پوست"}
                to={"/products/category/skin-care/پوست"}
              />
              <NavbarItem
                title={"کرم‌ها"}
                to={"/products/category/skin-care/کرم"}
              />
              <NavbarItem
                title={"لوسیون بدن"}
                to={"/products/category/skin-care/لوسیون"}
              />
              <NavbarItem
                title={"ماسک صورت"}
                to={"/products/category/skin-care/ماسک"}
              />
              <NavbarItem
                title={"بالم لب"}
                to={"/products/category/skin-care/بالم"}
              />
              <NavbarItem
                title={"سرم پوست"}
                to={"/products/category/skin-care/سرم"}
              />
              <NavbarItem
                title={"تقویت کننده ناخن"}
                to={"/products/category/skin-care/ناخن"}
              />
              <NavbarItem
                title={"لایه بردار پوست"}
                to={"/products/category/skin-care/لایه"}
              />
            </ul>
          </div>
        </li>
        <li className="mx-3 flex items-center relative navbar__item h-full">
          <Link
            to={"/products/category/hygienic"}
            className="navbar__link text-sm"
          >
            لوازم بهداشتی
          </Link>
          <RiArrowDownSLine className="text-gray-400 ms-0.5" />
          <div className="z-10 absolute top-12 right-0 shadow py-3 px-5 w-48 hidden navbar__dropdown-menu bg-white dark:bg-gray-900">
            <ul>
              <NavbarItem
                title={"ضد تعریق"}
                to={"/products/category/hygienic/تعریق"}
              />
              <NavbarItem
                title={"ژل بهداشتی"}
                to={"/products/category/hygienic/ژل"}
              />
            </ul>
          </div>
        </li>
        <li className="mx-3 flex items-center relative navbar__item h-full">
          <Link
            to={"/products/category/hair-care"}
            className="navbar__link text-sm"
          >
            لوازم مراقبتی مو
          </Link>
          <RiArrowDownSLine className="text-gray-400 ms-0.5" />
          <div className="z-10 absolute top-12 right-0 shadow py-3 px-5 w-48 hidden navbar__dropdown-menu bg-white dark:bg-gray-900">
            <ul>
              <NavbarItem
                title={"شامپو مو"}
                to={"/products/category/hair-care/شامپو"}
              />
              <NavbarItem
                title={"کرم مو"}
                to={"/products/category/hair-care/کرم"}
              />
              <NavbarItem
                title={"سرم مو"}
                to={"/products/category/hair-care/سرم"}
              />
              <NavbarItem
                title={"ماسک مو"}
                to={"/products/category/hair-care/ماسک"}
              />
            </ul>
          </div>
        </li>
        <li className="mx-3 flex items-center relative navbar__item h-full">
          <Link
            to={"/products/category/sunglasses"}
            className="navbar__link text-sm"
          >
            عینک آفتابی
          </Link>
          <RiArrowDownSLine className="text-gray-400 ms-0.5" />
          <div className="z-10 absolute top-12 right-0 shadow py-3 px-5 w-48 hidden navbar__dropdown-menu bg-white dark:bg-gray-900">
            <ul>
              <NavbarItem
                title={"عینک آفتابی زنانه"}
                to={"/products/category/sunglasses/زنانه"}
              />
              <NavbarItem
                title={"عینک آفتابی مردانه"}
                to={"/products/category/sunglasses/مردانه"}
              />
            </ul>
          </div>
        </li>
        <li className="mx-3 flex items-center relative navbar__item h-full">
          <Link to={"/درج-شکایت"} className="navbar__link text-sm">
            درج شکایت
          </Link>
        </li>
        <li className="mx-3 flex items-center relative navbar__item h-full">
          <Link to={"/contact-us"} className="navbar__link text-sm">
            تماس با ما
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
