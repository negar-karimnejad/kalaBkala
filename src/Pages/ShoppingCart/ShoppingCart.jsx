import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import SocialMedia from "../../components/SocialMedia/SocialMedia";
import Footer from "../../components/Footer/Footer";
import Support from "../../components/Support/Support";
import ScreenLoader from "../../components/ScreenLoader/ScreenLoader";
import { AiOutlineClose } from "react-icons/ai";
import { useGetUserQuery } from "../../Redux/store/users";
import {
  useAddCartProductCounterMutation,
  useDeleteFromShoppingCartMutation,
  useGetShoppingCartQuery,
  useMinusCartProductCounterMutation,
} from "../../Redux/store/ShoppingCart";
import ShoppingcartCosts from "../../components/ShoppingcartCosts/ShoppingcartCosts";

function ShoppingCart() {
  const [loader, setLoader] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [shoppingCart, setShoppingCart] = useState([]);

  const {
    data: shoppingCartItems,
    isLoading,
    refetch,
  } = useGetShoppingCartQuery();
  const { data: session, isLoading: isAuthing } = useGetUserQuery();
  const [deleteFromCart] = useDeleteFromShoppingCartMutation();
  const [addProductCounter] = useAddCartProductCounterMutation();
  const [minusProductCounter] = useMinusCartProductCounterMutation();

  useEffect(() => {
    if (!isLoading && !isAuthing) {
      const UserProducts = shoppingCartItems.filter(
        (item) => item.userID === session.session.user.id
      );
      setShoppingCart(UserProducts);
      if (UserProducts) {
        let price = 0;
        UserProducts.map(
          (product) => (price += product.price * product.counter)
        );
        setTotalPrice(price);
      }
    }
  }, [shoppingCartItems]);

  const deleteHandler = (id) => {
    deleteFromCart(id);
    setLoader(id);
  };
  const minusCounter = (product) => {
    minusProductCounter(product);
    refetch();
  };
  const addCounter = (product) => {
    addProductCounter(product);
    refetch();
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex lg:flex-row flex-col p-4 mt-5 md:gap-5">
        {isLoading ? (
          <ScreenLoader />
        ) : (
          <>
            <div className="w-full lg:w-8/12">
              {shoppingCart.length ? (
                <table className="table-auto w-full dark:bg-gray-900 dark:text-gray-200">
                  <thead>
                    <tr className="hidden md:table-row border-solid border-white border-2 border-b-gray-200 dark:border-gray-700">
                      <th className="font-bold text-lg p-2"></th>
                      <th className="font-bold text-lg p-2">محصول</th>
                      <th className="font-bold text-lg p-2">قیمت</th>
                      <th className="font-bold text-lg p-2">تعداد</th>
                      <th className="font-bold text-lg p-2">جمع جزء</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shoppingCart.map((product) => (
                      <tr
                        key={product.id}
                        className="border-2 border-solid border-white border-b-gray-300 dark:border-gray-700"
                      >
                        <td>
                          <AiOutlineClose
                            onClick={() => deleteHandler(product.id)}
                            className="cursor-pointer opacity-50 md:hidden absolute left-8 mt-3"
                          />
                        </td>
                        <td className="flex items-center py-5 md:my-2">
                          <p onClick={() => deleteHandler(product.id)}>
                            <AiOutlineClose className="cursor-pointer hidden md:block ml-2" />
                          </p>
                          <div className="w-28 relative">
                            <img
                              loading="lazy"
                              src={product.src[0]}
                              alt={product.name}
                              width={140}
                            />
                            <div
                              role="status"
                              className={`${
                                loader === product.id ? "flex" : "hidden"
                              } absolute right-0 top-0 bottom-0 m-auto bg-white w-full h-full opacity-70 items-center ps-12`}
                            >
                              <span className="fa fa-spinner text-gray-500 text-3xl animate-spin"></span>
                              <span className="sr-only">Loading...</span>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle md:table-cell block dark:px-2">
                          <p className="xl:mx-3 md:mr-2 xl:w-96 md:w-60 md:text-lg text-base">
                            {product.title}
                          </p>
                        </td>
                        <td className="dark:px-2 border border-dashed border-white border-b-gray-400 place-content-end justify-between md:table-cell flex md:px-8 py-2 md:py-0 whitespace-nowrap persian-font dark:border-gray-900 dark:border-b-gray-200">
                          <p className="md:hidden opacity-100 font-bold text-sm">
                            قیمت
                          </p>
                          <p className="opacity-70 ml-2">
                            {product.price.toLocaleString()} تومان
                          </p>
                        </td>
                        <td className="dark:px-2 border border-dashed border-white border-b-gray-400 place-content-end justify-between md:table-cell flex md:mx-8 py-2 md:py-0 dark:border-gray-900 dark:border-b-gray-200">
                          <p className="md:hidden opacity-100 font-bold text-sm">
                            تعداد
                          </p>
                          <div className="flex ml-2">
                            <button
                              className="border border-solid w-7 md:h-10 dark:border-gray-700"
                              onClick={() => minusCounter(product)}
                              disabled={product.counter <= 1}
                            >
                              -
                            </button>
                            <p className="flex items-center justify-center border-gray-200 border border-solid w-7 md:h-10 dark:border-gray-700">
                              {product.counter}
                            </p>
                            <button
                              className="border border-solid w-7 md:h-10 dark:border-gray-700"
                              onClick={() => addCounter(product)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="dark:px-2 place-content-end justify-between w-full md:table-cell py-2 md:py-0 flex whitespace-nowrap persian-font text-rose-600 font-bold text-lg dark:text-gray-100">
                          <p className="md:hidden opacity-100 font-bold text-sm text-gray-900 dark:text-gray-200">
                            جمع جزء
                          </p>
                          <p className="place-content-center flex ml-2">
                            {(product.price * product.counter).toLocaleString()}{" "}
                            تومان
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-2xl text-gray-400">
                  <p className="fa fa-shopping-basket text-4xl mb-5"></p>
                  <p className="">هیچ محصولی در سبد خرید شما وجود ندارد</p>
                </div>
              )}
            </div>
            <ShoppingcartCosts totalPrice={totalPrice} />
          </>
        )}
      </div>
      <SocialMedia />
      <Footer />
      <Support />
    </>
  );
}

export default ShoppingCart;
