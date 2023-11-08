import { useState } from "react";
import MobileMenuList from "../MobileMenuList/MobileMenuList";
import SearchProductBox from "../SearchProductBox/SearchProductBox";
import { FiSearch } from "react-icons/fi";
import { useEffect } from "react";
import { useRef } from "react";
import { useGetAllProductsQuery } from "../../Redux/store/allProducts";
import { useDispatch, useSelector } from "react-redux";
import { setIsShow } from "../../Redux/store/mobileMenu";

function MobileMenu() {
  const mobmenuRef = useRef();
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const [isShowDropDownMenu, setIsShowDropDownMenu] = useState(false);
  const [dropdownTitle, setDropdownTitle] = useState("");
  const [mobSearchedProducts, setMobSearchedProducts] = useState([]);
  const [mobSearchValue, setMobSearchValue] = useState("");
  const [loader, setLoader] = useState(false);

  const is_Show = useSelector((state) => state.mobileMenu.is_Show);

  const { data: allProducts = [] } = useGetAllProductsQuery();

  const mobSearchSubmit = (e) => {
    setMobSearchValue(e.target.value);
    if (allProducts && mobSearchValue) {
      const searchResultProducts = allProducts.filter((product) =>
        product.title.includes(e.target.value)
      );
      setMobSearchedProducts(searchResultProducts);
    }
    if (!mobSearchValue[1]) {
      setMobSearchedProducts([]);
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        is_Show &&
        mobmenuRef.current &&
        !mobmenuRef.current.contains(e.target)
      ) {
        dispatch(setIsShow(false));
        setMobSearchValue("");
        setMobSearchedProducts([]);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [is_Show]);

  useEffect(() => {
    if (mobSearchValue) {
      setLoader(true);
      if (mobSearchedProducts[0] || !mobSearchValue[1]) {
        setLoader(false);
      }
    }
  }, [mobSearchValue]);

  return (
    <div className={`${is_Show ? "bg-darker" : ""} header__overlay lg:hidden`}>
      <div
        className={`${
          is_Show
            ? "header__mobmenu-list show-mobmenu dark:bg-gray-900 dark:text-gray-200"
            : "header__mobmenu-list"
        }`}
        ref={mobmenuRef}
      >
        <div className="px-1 py-5 shadow-md shadow-gray-200 flex justify-between items-center dark:shadow-gray-700">
          <form className="w-full sm:mx-5" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="جستجوی محصولات"
              className="border-2 p-2 w-full outline-none border-none focus:ring-0 focus:border-gray-300 dark:bg-gray-700"
              ref={inputRef}
              value={mobSearchValue}
              onChange={mobSearchSubmit}
            />
            <button
              type="submit"
              className="absolute left-4 top-7 text-gray-400 flex items-center"
            >
              <FiSearch className={`${loader ? "hidden" : ""} text-2xl`} />
              <div
                role="status"
                className={`${
                  !mobSearchedProducts[0] && loader ? "flex" : "hidden"
                } absolute left-0 opacity-50 dark:opacity-80`}
              >
                <span className="fa fa-spinner mt-4 text-2xl text-gray-400 animate-spin fill-gray-900 dark:text-white"></span>
                <span className="sr-only">Loading...</span>
              </div>
            </button>
            <div
              className={`${
                mobSearchedProducts[0] && mobSearchValue ? "" : "hidden"
              } border-2 border-solid border-gray-200 absolute top-20 right-0 z-10 bg-white w-full shadow-2xl dark:border-gray-700`}
            >
              <div className="overflow-y-auto h-96 grid grid-cols-1">
                {mobSearchedProducts &&
                  mobSearchedProducts.map((product) => (
                    <SearchProductBox key={product.id} {...product} />
                  ))}
              </div>
            </div>
          </form>
        </div>
        <MobileMenuList
          isShowDropDownMenu={isShowDropDownMenu}
          dropdownTitle={dropdownTitle}
          setDropdownTitle={setDropdownTitle}
          setIsShowDropDownMenu={setIsShowDropDownMenu}
        />
      </div>
    </div>
  );
}

export default MobileMenu;
