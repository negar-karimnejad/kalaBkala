import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import SocialMedia from "../../components/SocialMedia/SocialMedia";
import Footer from "../../components/Footer/Footer";
import Support from "../../components/Support/Support";
import ScreenLoader from "../../components/ScreenLoader/ScreenLoader";
import { useEffect, useState } from "react";
import { useGetShoppingCartQuery } from "../../Redux/store/ShoppingCart";
import { useGetUserQuery } from "../../Redux/store/users";
import FormValidation from "../../components/FormValidation/FormValidation";

function Checkout() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [shoppingCart, setShoppingCart] = useState([]);

  const { data: session, isLoading: isAuthing } = useGetUserQuery();
  const {
    data: shoppingCartItems,
    isLoading,
    isSuccess,
  } = useGetShoppingCartQuery();

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
  }, [isAuthing, shoppingCartItems]);

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex md:flex-row flex-col p-5">
        <div className="relative w-full md:w-6/12 bg-gray-100 p-5 py-14 dark:bg-gray-700 dark:border dark:border-solid dark:border-gray-700">
          <div className="bg-[url('../../../../images/checkout/circle.svg')] bg-repeat-x -top-3 w-auto h-6 absolute left-0 right-0 m-auto dark:bg-[url('../../../../images/checkout/darkCircle.svg')]"></div>
          <div className="bg-[url('../../../../images/checkout/circle.svg')] bg-repeat-x -bottom-2 w-auto h-6 absolute left-0 right-0 m-auto dark:bg-[url('../../../../images/checkout/darkCircle.svg')]"></div>
          <h2 className="pt-5 pb-10 text-center font-bold text-2xl dark:text-white">
            سفارش شما
          </h2>
          <table className="table-auto w-full bg-white dark:bg-gray-800 dark:text-white">
            <thead>
              <tr className="border-2 border-solid border-white border-b-gray-300 dark:border-gray-800 dark:border-b-gray-500">
                <th className="font-bold text-lg py-2">محصول</th>
                <th className="font-bold text-lg">تعداد</th>
                <th className="font-bold text-lg">جمع جزء</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                shoppingCart.map((product) => (
                  <tr
                    key={product.id}
                    className="border border-solid border-white border-b-gray-300 dark:border-gray-800 dark:border-b-gray-600"
                  >
                    <td className="p-5">
                      <p className="xl:w-96 md:w-42 md:text-lg text-base">
                        {product.title}
                      </p>
                    </td>
                    <td className="align-middle persian-font text-xl opacity-90">
                      x {product.counter}
                    </td>
                    <td className="align-middle text-left pe-5 whitespace-nowrap persian-font text-xl opacity-80">
                      {product.price.toLocaleString()} تومان
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {isSuccess ? (
            <div className="bg-white dark:bg-gray-800 dark:text-white">
              <div className="text-lg font-bold flex justify-between py-5 px-5 border border-solid border-white border-b-gray-300 dark:border-gray-800 dark:border-b-gray-600">
                <p>جمع جزء</p>
                <p className="text-left pe-1 persian-font text-rose-600">
                  {totalPrice.toLocaleString()} تومان
                </p>
              </div>
              <div className="text-lg font-bold flex justify-between py-5 px-5 border border-solid border-white border-b-gray-300 dark:border-gray-800 dark:border-b-gray-600">
                <p>حمل و نقل</p>
                <p className="text-left pe-1">
                  <span className="font-thin">ارسال</span> رایگان
                </p>
              </div>
              <div className="text-xl font-bold flex justify-between py-5 px-5 border border-solid border-white border-b-gray-300 dark:border-gray-800 dark:border-b-gray-600">
                <p>مجموع</p>
                <p className="text-left pe-1 persian-font text-rose-600">
                  {totalPrice.toLocaleString()} تومان
                </p>
              </div>
            </div>
          ) : (
            <ScreenLoader />
          )}
        </div>
        <div className="w-full md:w-6/12 p-5">
          <h2 className="py-5 font-bold text-2xl dark:text-gray-100">
            صورت حساب و حمل و نقل
          </h2>
          <FormValidation />
        </div>
      </div>
      <SocialMedia />
      <Footer />
      <Support />
    </>
  );
}

export default Checkout;
