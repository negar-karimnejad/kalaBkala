import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useGetUserQuery } from "../../Redux/store/users";
import {
  setIsActive,
  useAddToShoppingCartMutation,
  useGetUserShoppingCartQuery,
} from "../../Redux/store/ShoppingCart";
import { useDispatch } from "react-redux";
import ScreenLoader from "../ScreenLoader/ScreenLoader";
import Swal from "sweetalert2";

function ProductBox(product) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [existProduct, setExistProduct] = useState([]);
  const { data: session } = useGetUserQuery();
  let userID = session?.session?.user.id;

  const { data: shoppingCart } = useGetUserShoppingCartQuery(userID);
  const [addToCart, { isLoading: loader }] = useAddToShoppingCartMutation();

  useEffect(() => {
    setExistProduct(
      shoppingCart?.find((product) => product.productID === productID)
    );
  }, [session, shoppingCart]);

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
  } = product;

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

  useEffect(() => {
    setIsLoading(false);
  }),
    [];

  return (
    <div className="relative h-full">
      {isLoading && <ScreenLoader />}
      <Link to={`/products-info/${name.replaceAll(" ", "-")}`}>
        <div className="md:flex flex-col justify-between h-[25rem]">
          <img
            className="w-96 sm:w-auto m-auto px-5 pt-2 bg-white"
            src={src[0]}
            alt={title}
            loading="lazy"
          />
          <p className="text-lg text-gray-700 font-bold sm:px-5 px-10">
            {title}
          </p>
        </div>
      </Link>
      <div className="absolute bottom-8 left-0 right-0 m-auto">
        <p className="persian-font text-red-700 text-lg font-bold mb-4">
          {exist ? price.toLocaleString() : "ناموجود"} {exist && "تومان"}
        </p>
        <div className="group m-auto w-40 h-12">
          <button
            className="relative w-full h-full overflow-hidden bg-rose-600 text-white text-base p-2 shadow-lg shadow-rose-900 flex flex-col items-center hover:bg-rose-700"
            onClick={addProductHandler}
          >
            <p className="absolute bottom-3 transition-all duration-300 group-hover:bottom-12">
              افزودن به سبد خرید
            </p>
            <HiOutlineShoppingCart className="text-3xl absolute top-12 transition-all duration-300 group-hover:top-2" />
            <div
              role="status"
              className={`${
                loader ? "flex" : "hidden"
              } absolute right-0 top-0 bg-white w-full h-full opacity-50 justify-center items-center`}
            >
              <span className="fa fa-spinner text-gray-500 text-3xl animate-spin"></span>
              <span className="sr-only">Loading...</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductBox;
