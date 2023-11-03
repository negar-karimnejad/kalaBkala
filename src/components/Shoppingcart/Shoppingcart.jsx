import { useRef, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCartX } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../Redux/store/users";
import ScreenLoader from "../ScreenLoader/ScreenLoader";
import Button from "./../Button/Button";
import {
  setIsActive,
  useDeleteFromShoppingCartMutation,
  useGetShoppingCartQuery,
} from "../../Redux/store/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";

function Shoppingcart() {
  const shoppingcartRef = useRef();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [shoppingCart, setShoppingCart] = useState([]);
  const isActive = useSelector((state) => state.shoppingCart.is_active);
  const { data: session, isLoading: isAuthing } = useGetUserQuery();
  const { data: shoppingCartItems, isLoading } = useGetShoppingCartQuery();
  const [deleteFromCart] = useDeleteFromShoppingCartMutation();

  useEffect(() => {
    const UserProducts = shoppingCartItems?.filter(
      (item) => item.userID === session?.session?.user.id
    );
    setShoppingCart(UserProducts);
    if (UserProducts) {
      let price = 0;
      UserProducts.map((product) => (price += product.price * product.counter));
      setTotalPrice(price);
    }
  }, [shoppingCartItems, session]);

  const deleteHandler = (id) => {
    deleteFromCart(id);
    setLoader(id);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isActive &&
        shoppingcartRef.current &&
        !shoppingcartRef.current.contains(e.target)
      ) {
        dispatch(setIsActive(false));
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isActive, shoppingCart]);

  return (
    <div className={`${isActive ? "bg-darker" : ""} header__overlay`}>
      <div
        ref={shoppingcartRef}
        className={`${
          isActive ? "show-up" : ""
        } header__shopping-cart dark:bg-gray-900 dark:text-gray-50 dark:shadow-sm dark:shadow-gray-400`}
      >
        <div className="flex p-6 items-center justify-between w-full border border-white border-solid border-b-gray-300 dark:border-gray-900 dark:border-b-gray-700">
          <h2 className="font-bold text-2xl">سبد خرید</h2>
          <p
            className="text-xl flex items-center cursor-pointer hover:opacity-80"
            onClick={() => dispatch(setIsActive(false))}
          >
            <AiOutlineClose className="me-1" />
            بستن
          </p>
        </div>
        {isLoading ? (
          <ScreenLoader />
        ) : shoppingCart?.length === 0 ||
          (!isAuthing && !session?.session?.access_token) ? (
          <div className="flex flex-col items-center py-10">
            <BsCartX className="text-8xl opacity-10" />
            <p className="font-bold text-lg my-5">
              هیچ محصولی در سبد خرید نیست.
            </p>
            <Link to={"/products/1"}>
              <Button title="بازگشت به فروشگاه" />
            </Link>
          </div>
        ) : (
          <div className="w-full border border-solid border-white border-b-gray-300 dark:border-0">
            <div className="overflow-y-auto h-96">
              {shoppingCart?.map((product) => (
                <div key={product.id}>
                  <div className="relative overflow-y-auto flex justify-between py-4 px-3 border border-solid border-white border-b-gray-300 cursor-pointer transition-all hover:bg-gray-100 dark:border-gray-900 dark:border-b-gray-700 dark:hover:bg-gray-800">
                    <Link
                      to={`/products-info/${product.name.replaceAll(" ", "-")}`}
                    >
                      <div className="flex items-center">
                        <img
                          loading="lazy"
                          src={product.src[0]}
                          alt={product.name}
                          className="w-28"
                        />
                        <div className="flex flex-col gap-y-4 w-52 dark:mr-2">
                          <p className="font-bold text-gray-700 text-md dark:text-gray-50 dark:font-medium">
                            {product.title}
                          </p>
                          <p className="persian-font text-rose-600 font-bold dark:text-gray-50 dark:font-medium">
                            {product.price.toLocaleString()} تومان
                          </p>
                        </div>
                      </div>
                    </Link>
                    <div>
                      <AiOutlineClose
                        className="text-xl text-black transition-all hover:bg-white rounded-3xl p-1 dark:text-gray-200 dark:hover:bg-gray-700"
                        onClick={() => deleteHandler(product.id)}
                      />
                      <div
                        role="status"
                        className={`${
                          loader === product.id ? "flex" : "hidden"
                        } absolute right-0 top-0 bottom-0 m-auto bg-white w-full h-full opacity-70 items-center ps-12 dark:bg-gray-800`}
                      >
                        <span className="fa fa-spinner text-gray-400 text-3xl animate-spin"></span>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-xl font-bold flex justify-between w-full p-6 border border-solid border-white border-b-gray-300 dark:border-gray-900 dark:border-y-gray-700 dark:font-medium">
              <h2 className="  ">جمع کل سبد خرید:</h2>
              <p className="persian-font text-rose-600 dark:text-gray-50 dark:font-medium dark:text-2xl">
                {totalPrice.toLocaleString()} تومان
              </p>
            </div>
            <div className="flex flex-col p-6 w-full">
              <Link
                to={"/cart"}
                className="text-center text-lg text-gray-900 bg-gray-300 p-2 mt-3 transition-all font-bold hover:bg-gray-400"
              >
                مشاهده سبد خرید
              </Link>
              <Link
                to={"/checkout"}
                className="text-center text-lg text-white bg-rose-600 p-2 mt-3 transition-all hover:bg-rose-700"
              >
                تسویه حساب
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shoppingcart;
