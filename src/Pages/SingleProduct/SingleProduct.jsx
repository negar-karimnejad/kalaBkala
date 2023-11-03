import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import SocialMedia from "../../components/SocialMedia/SocialMedia";
import Footer from "../../components/Footer/Footer";
import Support from "../../components/Support/Support";
import Button from "../../components/Button/Button";
import Services from "../../components/Services/Services";
import Magnifier from "react-magnifier";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs, EffectFade } from "swiper/modules";
import { useGetSingleProductQuery } from "../../Redux/store/allProducts";
import {
  setIsActive,
  useAddToShoppingCartMutation,
  useGetUserShoppingCartQuery,
} from "../../Redux/store/ShoppingCart";
import { useGetUserQuery } from "../../Redux/store/users";
import { useGetOneCommentQuery } from "../../Redux/store/comments";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import ScreenLoader from "../../components/ScreenLoader/ScreenLoader";
import CommentsBar from "../../components/CommentsBar.jsx/CommentsBar";
import Swal from "sweetalert2";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import "./SingleProduct.css";

function SingleProduct() {
  const { name: urlName } = useParams();
  const dispatch = useDispatch();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isOpenComments, setIsOpenComments] = useState(false);
  const [isOpenDetails, setIsOpenDetails] = useState(true);
  const [existProduct, setExistProduct] = useState(null);

  const { data: session } = useGetUserQuery();
  let userID = session?.session?.user.id;
  const { data: shoppingCart, isLoadin: isLoadingShoppingCart } =
    useGetUserShoppingCartQuery(userID);

  const { data: product, isLoading } = useGetSingleProductQuery(
    urlName.replaceAll("-", " ")
  );
  const [addToCart, { isLoading: loader }] = useAddToShoppingCartMutation();

  const {
    id: productID,
    title,
    rating,
    name,
    infos,
    subtitle,
    exist,
    features,
    counter,
    src,
    discount,
    price,
    category,
  } = !isLoading && product[0];

  const { data: comments } = useGetOneCommentQuery(productID);

  const detailsClickHandler = () => {
    setIsOpenComments(false);
    setIsOpenDetails(true);
  };
  const commentsClickHandler = () => {
    setIsOpenComments(true);
    setIsOpenDetails(false);
  };

  useEffect(() => {
    setExistProduct(
      shoppingCart?.find((product) => product.productID === productID)
    );
  }, [shoppingCart]);

  const addProductHandler = () => {
    if (!userID) {
      Swal.fire({
        html: '<div style="display: flex; align-items: center;justify-content:space-between"><span>ابتدا باید وارد سایت شوید</span><button id="login-button" class="swal2-confirm swal2-styled" style="background-color:#f9b57b">LOGIN</button></div>',
        text: "ابتدا باید وارد سایت شوید",
        toast: true,
        timer: 4000,
        position: "top-right",
        showConfirmButton: false,
        icon: "warning",
      });
      document
        .getElementById("login-button")
        .addEventListener("click", function () {
          window.location.href = "/login";
        });
    }
    let id = new Date().getTime();
    if (existProduct) {
      Swal.fire({
        text: "این محصول در سبد خرید شما موجود است",
        toast: true,
        timer: 4000,
        position: "top-right",
        showConfirmButton: false,
        icon: "warning",
      });
    } else {
      addToCart([
        {
          id,
          productID,
          title,
          rating,
          name,
          infos,
          subtitle,
          userID,
          exist,
          features,
          counter,
          src,
          discount,
          price,
          category,
          is_active: false,
        },
      ]).unwrap();
      dispatch(setIsActive(true));
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <Breadcrumb
        links={[
          { id: 1, title: "محصولات", to: "/products/1" },
          {
            id: 2,
            title: urlName.replaceAll("-", " "),
            to: `/products-info/${urlName}`,
          },
        ]}
      />
      <div className="single-product container flex md:flex-row flex-col gap-10 my-5">
        {isLoading ? (
          <ScreenLoader />
        ) : (
          <>
            <div className="pt-10 flex items-center justify-center w-full md:w-6/12 h-fit">
              <div className="relative overflow-hidden">
                <Swiper
                  className="single-product__swiper"
                  modules={[FreeMode, Navigation, Thumbs, EffectFade]}
                  thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                  loop={true}
                  effect={"fade"}
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation
                >
                  {src.map((src, index) => (
                    <SwiperSlide key={index}>
                      <Magnifier
                        mgWidth={250}
                        mgHeight={250}
                        zoomFactor={0.6}
                        mgShowOverflow={false}
                        src={src}
                        width={300}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                  className="mt-10 single-product__thumbs-swiper"
                  slidesPerView={6}
                  navigation
                  onSwiper={setThumbsSwiper}
                  spaceBetween={20}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                >
                  {src.map((src, index) => (
                    <SwiperSlide key={index}>
                      <img
                        className="border border-solid border-gray-200"
                        src={src}
                        alt={`slider${index}`}
                        loading="lazy"
                      />
                      <div className="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="w-full md:w-6/12">
              <div className="flex flex-col gap-14 p-4 pb-14 border border-solid border-white border-b-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200">
                <p className="text-2xl font-bold pb-5 border border-solid border-white border-b-gray-100 dark:border-gray-900 dark:border-b-gray-700">
                  {title}
                </p>
                <div>
                  <div className="gap-x-2 text-xl flex items-center">
                    <p
                      className={`${
                        exist ? "text-rose-600" : "text-gray-300"
                      } persian-font  text-3xl font-bold`}
                    >
                      {exist ? price.toLocaleString() : "ناموجود"}{" "}
                      {exist && "تومان"}
                    </p>
                    <div>
                      {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                          <button key={index}>
                            <FaStar
                              size={15}
                              className={
                                ratingValue <= rating
                                  ? "text-[#ffe101]"
                                  : "text-[#ccc]"
                              }
                            />
                          </button>
                        );
                      })}
                    </div>
                    <span className="opacity-50 ">
                      (دیدگاه {comments?.length} کاربر)
                    </span>
                  </div>
                  <p className="opacity-60 text-xl mt-8">{subtitle}</p>
                </div>
                <ul className="list-disc text-xl space-y-4 pr-5">
                  {features &&
                    features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                </ul>
                <div className="">
                  <div className="relative">
                    <Button
                      title="افزودن به سبد خرید"
                      onClick={addProductHandler}
                    />
                    <div
                      role="status"
                      className={`${
                        loader ? "flex" : "hidden"
                      } absolute right-0 top-0 bg-white w-full h-full opacity-50 justify-center items-center`}
                    >
                      <span className="fa fa-spinner text-gray-500 text-3xl animate-spin"></span>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Services />
      <div className="relative container py-10">
        <div className="md:mx-0 mx-auto mb-10 p-1.5 text-gray-500 gap-2 rounded-lg grid grid-cols-2 w-fit bg-gray-100 dark:bg-gray-900">
          <button
            type="button"
            onClick={detailsClickHandler}
            className={`${
              !isOpenDetails
                ? ""
                : "bg-white p-3 px-5 rounded-lg dark:bg-gray-800 dark:text-gray-200"
            }`}
          >
            مشخصات
          </button>
          <button
            className={`${
              !isOpenComments
                ? ""
                : "bg-white p-3 px-5 rounded-lg dark:bg-gray-800 dark:text-gray-200"
            } persian-font`}
            type="button"
            onClick={commentsClickHandler}
          >
            نظرات ({comments?.length})
          </button>
        </div>
        {isOpenDetails && (
          <div className="w-full  bg-white h-full dark:bg-gray-900 dark:text-gray-200">
            <div className="flex dark:px-2">
              <div className="sm:w-4/12 w-6/12">
                {product &&
                  infos.map((item, index) => (
                    <p
                      key={index}
                      className="whitespace-nowrap ml-20 py-5 font-bold border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700"
                    >
                      {item[0]}
                    </p>
                  ))}
              </div>
              <div className="sm:w-8/12 w-6/12">
                {product &&
                  infos.map((item, index) => (
                    <p
                      key={index}
                      className="p-5 opacity-70 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700"
                    >
                      {item[1]}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        )}
        {isOpenComments && !isLoading && (
          <CommentsBar
            productName={name}
            productID={productID}
            productRating={rating}
          />
        )}
      </div>
      <SocialMedia />
      <Footer />
      <Support />
    </>
  );
}
export default SingleProduct;
