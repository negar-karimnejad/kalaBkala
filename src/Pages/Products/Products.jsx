import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../../Redux/store/allProducts";
import { PiWarningCircle } from "react-icons/pi";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import SocialMedia from "../../components/SocialMedia/SocialMedia";
import Footer from "../../components/Footer/Footer";
import Support from "../../components/Support/Support";
import ScreenLoader from "../../components/ScreenLoader/ScreenLoader";
import OrderingModal from "../../components/OrderingModal/OrderingModal";
import Pagination from "../../components/Pagination/Pagination";
import ProductsFilter from "../../components/ProductsFilter/ProductsFilter";
import ProductBox from "../../components/ProductBox/ProductBox";
import "./Products.css";

function Products() {
  const { page } = useParams();
  const { category } = useParams();
  const { title } = useParams();
  const { ordering } = useParams();

  const { data: allProducts, isLoading } = useGetAllProductsQuery();

  const [pagesCount, setPagesCount] = useState(null);
  const [shownProducts, setShownProducts] = useState([]);
  const [isShowOrderingModal, setIsShowOrderingModal] = useState(false);
  const [isShowFilterModal, setIsShowFilterModal] = useState(false);

  let itemsCount = 9;
  let endIndex, startIndex, paginatedItems, pagesNumber;

  useEffect(() => {
    if (allProducts && page) {
      endIndex = itemsCount * page;
      startIndex = endIndex - itemsCount;
      paginatedItems = allProducts.slice(startIndex, endIndex);
      setShownProducts(paginatedItems);
      pagesNumber = Math.ceil(allProducts.length / itemsCount);
      setPagesCount(pagesNumber);
    }
    if (allProducts && category) {
      setShownProducts(
        allProducts.filter((product) => product.category === category)
      );
    }
    if (allProducts && category && title) {
      setShownProducts(
        allProducts
          .filter((product) => product.category === category)
          .filter((product) => product.title.includes(title))
      );
    }
    if (allProducts && ordering) {
      let orderingProducts = [];
      if (ordering === "cheapest") {
        let orderingProducts = [...allProducts].sort(
          (a, b) => a.price - b.price
        );
        setShownProducts(orderingProducts);
      }
      if (ordering === "expensive") {
        let orderingProducts = [...allProducts].sort(
          (a, b) => b.price - a.price
        );
        setShownProducts(orderingProducts);
      }
      if (ordering === "newest") {
        let orderingProducts = [...allProducts].sort(
          (a, b) => b.created_at - a.created_at
        );
        setShownProducts(orderingProducts);
      }
      if (ordering === "most-visited") {
        let orderingProducts = [...allProducts].sort((a, b) => b.id - a.id);
        setShownProducts(orderingProducts);
      }
    }
  }, [page, allProducts, category, title, ordering]);

  return (
    <div div className="products">
      <OrderingModal
        ordering={ordering}
        isShowOrderingModal={isShowOrderingModal}
        setIsShowOrderingModal={setIsShowOrderingModal}
      />
      <Header />
      <Navbar />
      <Breadcrumb links={[{ id: 1, title: "محصولات", to: "/products/1" }]} />
      <div className=" flex p-5 gap-10">
        <ProductsFilter
          allProducts={allProducts}
          setShownProducts={setShownProducts}
          isShowFilterModal={isShowFilterModal}
          setIsShowFilterModal={setIsShowFilterModal}
        />
        <div className="lg:w-9/12 w-full space-y-5">
          <div className="hidden lg:flex bg-white h-20 items-center px-5 shadow-md border border-solid border-gray-100 rounded-md dark:bg-gray-900 dark:border-gray-700">
            <h4 className="flex items-center text-lg w-1/5 font-bold text-gray-500 dark:text-gray-400">
              <span className="fa fa-sort-amount-asc"></span>
              ترتیب نمایش:
            </h4>
            <ul className="flex space-x-10 text-gray-400 dark:text-gray-200">
              <li></li>
              <li
                className={`${
                  ordering === "most-visited" ? "text-rose-600" : ""
                } cursor-pointer`}
              >
                <Link to={`/products/order/most-visited`}>پربازدیدترین</Link>
              </li>
              <li className="text-xl text-gray-200">|</li>
              <li
                className={`${
                  ordering === "cheapest" ? "text-rose-600" : ""
                } cursor-pointer`}
              >
                <Link to={`/products/order/cheapest`}>ارزان ترین</Link>
              </li>
              <li className="text-xl text-gray-200">|</li>
              <li
                className={`${
                  ordering === "expensive" ? "text-rose-600" : ""
                } cursor-pointer`}
              >
                <Link to={`/products/order/expensive`}>گران ترین</Link>
              </li>
              <li className="text-xl text-gray-200">|</li>
              <li
                className={`${
                  ordering === "newest" ? "text-rose-600" : ""
                } cursor-pointer`}
              >
                <Link to={`/products/order/newest`}>جدیدترین</Link>
              </li>
            </ul>
          </div>
          <div className="lg:hidden grid grid-cols-2 gap-2 h-16">
            <div
              onClick={() => setIsShowFilterModal(true)}
              className="cursor-pointer text-lg flex bg-gray-100 items-center justify-center transition-all hover:shadow-lg rounded-md dark:border dark:border-solid dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700"
            >
              <span className="fa fa-filter ml-2 text-gray-500"></span>
              فیلتر جستجو
            </div>
            <div
              onClick={() => setIsShowOrderingModal(true)}
              className="cursor-pointer text-lg flex bg-gray-100 items-center justify-center transition-all hover:shadow-lg rounded-md dark:border dark:border-solid dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700"
            >
              <span className="fa fa-sort-amount-asc ml-2 text-gray-500"></span>
              ترتیب نمایش
            </div>
          </div>
          {isLoading ? (
            <div className="grid md:grid-cols-3 sm:grid-cols-2">
              <ScreenLoader />
              <ScreenLoader />
              <ScreenLoader />
            </div>
          ) : shownProducts.length ? (
            <div className="w-full grid md:grid-cols-3 sm:grid-cols-2 gap-8 text-center">
              {shownProducts.map((product) => (
                <div
                  key={product.id}
                  className="border border-solid border-gray-100 shadow-lg shadow-gray-300 h-[35rem] bg-white rounded-lg overflow-hidden dark:shadow-gray-950"
                >
                  <ProductBox {...product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-900 text-gray-50 dark:bg-gray-400 dark:text-black w-full">
              <p className="flex items-center p-4 text-xl">
                <PiWarningCircle className="me-4 text-3xl" />
                هیچ محصولی یافت نشد.
              </p>
            </div>
          )}
          <Pagination page={page} pagesCount={pagesCount} />
        </div>
      </div>
      <SocialMedia />
      <Footer />
      <Support />
    </div>
  );
}
export default Products;
