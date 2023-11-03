import { FiSearch } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { useGetAllProductsQuery } from "../../Redux/store/allProducts";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import SearchProductBox from "../SearchProductBox/SearchProductBox";
import Shoppingcart from "../Shoppingcart/Shoppingcart";
import MobileMenu from "../MobileMenu/MobileMenu";
import HeaderUserIcon from "../HeaderUserIcon/HeaderUserIcon";
import "./Header.css";

function Header() {
  const inputRef = useRef(null);
  const [isShowMobmenu, setIsShowMobmenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [loader, setLoader] = useState(false);

  const { data: allProducts } = useGetAllProductsQuery();

  const searchHandler = () => {
    clickOnMobMenu();
    inputRef.current.focus();
  };
  const clickOnMobMenu = () => {
    setIsShowMobmenu((prev) => !prev);
  };

  const searchSubmit = (e) => {
    setSearchValue(e.target.value);
    if (allProducts && searchValue) {
      const searchResultProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(e.target.value)
      );
      setSearchedProducts(searchResultProducts);
    }
    if (!searchValue[1]) {
      setSearchedProducts([]);
    }
  };

  useEffect(() => {
    searchValue ? setLoader(true) : setLoader(false) + setSearchedProducts([]);
  }, [searchValue]);

  return (
    <>
      <div className="border border-solid border-white border-b-gray-200 z-[2] top-0 sticky mb-[0.4rem] bg-white pt-[0.1rem] w-full dark:bg-gray-800 dark:border-gray-800 dark:border-b-gray-600">
        <div className="relative flex justify-between items-center m-4">
          <div className="flex items-center lg:hidden">
            <div className="header__mobmenu-container" onClick={clickOnMobMenu}>
              <div className="header__mobmenu"></div>
            </div>
            <FiSearch
              className="text-2xl ms-5 text-gray-600 cursor-pointer transition-all hover:text-gray-400"
              onClick={searchHandler}
            />
          </div>
          <Link to={"/"}>
            <img
              loading="lazy"
              src="/images/header/KalaBKala.webp"
              className="lg:static absolute top-0 bottom-0 left-0 right-0 m-auto w-48 py-[4px] px-1 dark:bg-gray-100 dark:rounded-md"
              alt="KalaBKala"
            />
          </Link>
          <form action="" className="relative w-[60%] hidden lg:block">
            <Input
              placeholder="جستجوی محصولات"
              value={searchValue}
              onChange={searchSubmit}
            />
            <button
              type="submit"
              className="bg-rose-600 text-[1.7rem] w-12 h-full absolute left-0 top-0 flex items-center justify-center"
            >
              <FiSearch
                className={`${
                  !searchedProducts[0] && loader ? "hidden" : "block"
                } text-white`}
              />
              <div
                role="status"
                className={`${
                  loader ? "flex" : "hidden"
                } absolute right-0 top-0  w-full h-full justify-center items-center`}
              >
                <span
                  className={`${
                    searchedProducts[0] ? "hidden" : ""
                  } fa fa-spinner text-2xl animate-spin text-gray-200`}
                ></span>{" "}
              </div>
            </button>
            <div
              className={`${
                searchedProducts[0] ? "" : "hidden"
              } border-2 border-solid border-gray-200 p-2 absolute top-11 right-0 z-10 bg-white w-full dark:bg-gray-900 dark:border-gray-500`}
            >
              <div className="overflow-y-auto h-96 grid md:grid-cols-3 grid-cols-2 gap-2 dark:bg-gray-900 dark:border-gray-500">
                {searchedProducts &&
                  searchedProducts.map((product) => (
                    <SearchProductBox key={product.id} {...product} />
                  ))}
              </div>
            </div>
          </form>
          <div className="flex items-center w-64 justify-end">
            <HeaderUserIcon />
          </div>
        </div>
        <Shoppingcart />
      </div>
      <div className="relative lg:hidden border border-solid border-white border-b-gray-200 pb-2 leave dark:border-gray-800 dark:border-b-gray-700">
        <form className="w-auto relative mx-5">
          <Input
            placeholder="جستجوی محصولات"
            value={searchValue}
            onChange={searchSubmit}
          />
          <button
            type=""
            className="absolute left-3 inset-y-1/4 text-gray-400‍‍ dark:text-gray-50"
          >
            <FiSearch className={`${loader ? "hidden" : ""} text-2xl`} />
            <div
              role="status"
              className={`${
                loader ? "" : "hidden"
              } absolute -top-1 left-0 opacity-50 `}
            >
              <span
                className={`${
                  searchedProducts[0] ? "hidden" : ""
                } fa fa-spinner text-2xl animate-spin`}
              ></span>
              <span className="sr-only">Loading...</span>
            </div>
          </button>
          <div
            className={`${
              searchedProducts[0] ? "" : "hidden"
            } border-2 border-solid border-gray-200 p-2 absolute top-11 right-0 z-10 bg-white w-full dark:bg-gray-900 dark:border-gray-500`}
          >
            <div className="overflow-y-auto h-96 grid md:grid-cols-3 grid-cols-2 gap-2">
              {searchedProducts &&
                searchedProducts.map((product) => (
                  <SearchProductBox key={product.id} {...product} />
                ))}
            </div>
          </div>
        </form>
      </div>
      <MobileMenu
        isShowMobmenu={isShowMobmenu}
        setIsShowMobmenu={setIsShowMobmenu}
      />
    </>
  );
}

export default Header;
