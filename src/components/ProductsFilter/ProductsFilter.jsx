import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";

function ProductsFilter({
  allProducts,
  isShowFilterModal,
  setIsShowFilterModal,
  setShownProducts,
}) {
  const navigate = useNavigate();

  const [filterCategory, setFilterCategory] = useState("all");
  const [filterSearchInputValue, setFilterSearchInputValue] = useState("");
  const [priceRangeFrom, setPriceRangeFrom] = useState(0);
  const [priceRangeTo, setPriceRangeTo] = useState(30000000);
  const [checkedExistence, setCheckedExistence] = useState(false);

  const implementFilters = (e) => {
    e.preventDefault();
    navigate(
      `/products/search/${
        filterSearchInputValue ? filterSearchInputValue : "no-search-value"
      }`
    );
    let filterSearched = [];

    if (filterSearchInputValue) {
      filterSearched = allProducts.filter((product) =>
        product.title.includes(filterSearchInputValue)
      );
    } else {
      filterSearched = allProducts;
    }
    setFilterSearchInputValue("");
    setIsShowFilterModal(false);

    const priceFilteredProducts = filterSearched.filter(
      (product) =>
        product.price >= priceRangeFrom && product.price <= priceRangeTo
    );
    if (checkedExistence) {
      const existProducts = priceFilteredProducts.filter(
        (product) => product.exist
      );
      setShownProducts(existProducts);
    } else {
      setShownProducts(priceFilteredProducts);
    }
  };

  return (
    <>
      <div className="relative hidden lg:block w-3/12 space-y-5">
        <div className="h-fit border border-solid border-gray-100 rounded-md p-5 shadow-lg dark:bg-gray-900 dark:border-gray-700">
          <h4 className="pb-3 font-bold text-2xl text-center border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700 dark:text-gray-200">
            فیلترها
          </h4>
          <div className="p-3">
            <h5 className="font-bold text-xl pb-5 dark:text-gray-200">
              دسته بندی ها
            </h5>
            <ul className="list-disc space-y-6 text-gray-600 text-lg dark:text-gray-400">
              <li>
                <Link
                  to={"/products/1"}
                  id={"all"}
                  onClick={(e) => setFilterCategory(e.target.id)}
                  className={`${
                    filterCategory === "all" ? "text-rose-600 font-bold" : ""
                  }`}
                >
                  همه دسته بندی ها
                </Link>
              </li>
              <li>
                <Link
                  to={"/products/category/perfume"}
                  id={"perfume"}
                  onClick={(e) => setFilterCategory(e.target.id)}
                  className={`${
                    filterCategory === "perfume"
                      ? "text-rose-600 font-bold"
                      : ""
                  }`}
                >
                  عطر و ادکلن
                </Link>
              </li>
              <li>
                <Link
                  to={"/products/category/skin-care"}
                  id={"skin"}
                  onClick={(e) => setFilterCategory(e.target.id)}
                  className={`${
                    filterCategory === "skin" ? "text-rose-600 font-bold" : ""
                  }`}
                >
                  مراقبت از پوست
                </Link>
              </li>
              <li>
                <Link
                  to={"/products/category/hair-care"}
                  id={"hair"}
                  onClick={(e) => setFilterCategory(e.target.id)}
                  className={`${
                    filterCategory === "hair" ? "text-rose-600 font-bold" : ""
                  }`}
                >
                  مراقبت از مو
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="h-fit border border-solid border-gray-100 rounded-md p-5 shadow-lg dark:bg-gray-900 dark:border-gray-700">
          <h4 className="pb-3 font-bold text-xl dark:text-gray-200">عنوان</h4>
          <div className="p-3">
            <form onSubmit={implementFilters}>
              <Input
                placeholder={"عنوان جستجو را بنویسید"}
                value={filterSearchInputValue}
                onChange={(e) => setFilterSearchInputValue(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="h-fit border border-solid border-gray-100 rounded-md p-5 shadow-lg dark:bg-gray-900 dark:border-gray-700">
          <h4 className="pb-3 font-bold text-xl border border-solid border-white border-b-gray-200 dark:text-gray-200 dark:border-gray-900 dark:border-b-gray-700">
            حالت نمایش
          </h4>
          <div className="py-5 flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={checkedExistence ? true : false}
                onChange={() => setCheckedExistence(!checkedExistence)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
            </label>
            <span className="mr-3 text-lg font-medium text-gray-900 dark:text-gray-300">
              فقط کالاهای موجود
            </span>
          </div>
        </div>
        <div className="h-fit border border-solid border-gray-100 rounded-md p-5 shadow-lg dark:bg-gray-900 dark:border-gray-700">
          <h4 className="pb-3 font-bold text-xl dark:text-gray-200">قیمت ها</h4>
          <div className="">
            <form className="w-full h-5 relative mb-10">
              <input
                type="range"
                min={0}
                max={30000000}
                step={100000}
                value={priceRangeFrom}
                onChange={(e) => setPriceRangeFrom(e.target.value)}
              />
              <input
                type="range"
                min={0}
                max={30000000}
                step={100000}
                value={priceRangeTo}
                onChange={(e) => setPriceRangeTo(e.target.value)}
              />
            </form>
            <div className="persian-font pt-3 flex justify-between w-full">
              <span className="flex flex-col text-gray-500 dark:text-gray-200">
                از قیمت:
                <span className="text-black font-bold mt-2 dark:text-white">
                  {Number(priceRangeFrom).toLocaleString()} تومان
                </span>
              </span>
              <span className="flex flex-col text-gray-500 dark:text-gray-200">
                تا قیمت:
                <span className="text-black font-bold mt-2 dark:text-white">
                  {" "}
                  {Number(priceRangeTo).toLocaleString()} تومان
                </span>
              </span>
            </div>
          </div>
        </div>
        <Button title={"اعمال فیلتر"} onClick={implementFilters} />
      </div>
      <div
        className={`${
          isShowFilterModal ? "visible bg-opacity-50" : "invisible bg-opacity-0"
        } lg:hidden transition-all duration-700 fixed top-0 left-0 bg-black flex flex-col items-center justify-center w-full h-full z-10`}
      >
        <div
          className={`${
            isShowFilterModal ? "top-0" : "-top-full"
          } transition-all duration-700 relative overflow-hidden flex flex-col items-center justify-start py-6 md:w-8/12 md:h-fit w-full h-full bg-rose-100 md:rounded-md dark:bg-gray-900 dark:text-gray-50`}
        >
          <span
            className="fa fa-close absolute right-8 top-8 cursor-pointer opacity-50"
            onClick={() => setIsShowFilterModal(false)}
          ></span>
          <div className="w-full flex items-center justify-center">
            <span className="text-xl fa fa-filter ml-2 text-gray-600"></span>
            <span className="text-lg">فیلتر جستجو:</span>
          </div>
          <div className="my-5 w-full h-fit bg-white border border-solid border-gray-100 rounded-md px-10 py-5 shadow-lg dark:bg-gray-800 dark:border-gray-600">
            <h4 className="pb-3 text-lg">عنوان</h4>
            <div className="">
              <form onSubmit={implementFilters}>
                <Input
                  placeholder={"عنوان جستجو را بنویسید"}
                  value={filterSearchInputValue}
                  onChange={(e) => setFilterSearchInputValue(e.target.value)}
                />
                <div className="py-5 flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={checkedExistence ? true : false}
                      onChange={() => setCheckedExistence(!checkedExistence)}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                  </label>
                  <span className="m-3 text-md font-medium text-gray-900 dark:text-gray-300">
                    فقط کالاهای موجود
                  </span>
                </div>
              </form>
            </div>
          </div>
          <div className="mb-5 w-full h-fit bg-white border border-solid border-gray-100 rounded-md px-10 py-5 shadow-lg dark:bg-gray-800 dark:border-gray-600">
            <h4 className="pb-3 text-lg">قیمت ها</h4>
            <div className="">
              <form className="w-full h-5 relative mb-10">
                <input
                  type="range"
                  min={0}
                  max={30000000}
                  step={100000}
                  value={priceRangeFrom}
                  onChange={(e) => setPriceRangeFrom(e.target.value)}
                />
                <input
                  type="range"
                  min={0}
                  max={30000000}
                  step={100000}
                  value={priceRangeTo}
                  onChange={(e) => setPriceRangeTo(e.target.value)}
                />
              </form>
              <div className="persian-font pt-3 flex justify-between w-full">
                <span className="flex items-center text-gray-500 dark:text-gray-50">
                  از قیمت: {Number(priceRangeFrom).toLocaleString()} تومان
                </span>
                <span className="flex items-center text-gray-500 dark:text-gray-50">
                  تا قیمت: {Number(priceRangeTo).toLocaleString()} تومان
                </span>
              </div>
            </div>
          </div>
          <div className="w-full px-10">
            <Button title={"اعمال فیلتر"} onClick={implementFilters} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsFilter;
