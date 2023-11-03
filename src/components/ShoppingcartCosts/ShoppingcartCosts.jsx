import { Link } from "react-router-dom";
import Button from "../Button/Button";

function ShoppingcartCosts({ totalPrice }) {
  return (
    <div className="w-full lg:w-4/12 flex flex-col p-5 md:mt-0 mt-20 border-2 border-solid lg:border-white lg:border-r-gray-200 border-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200">
      <h2 className="font-bold text-3xl">جمع کل سبد خرید</h2>
      <div className="py-5 text-xl">
        <div className="flex justify-between py-8 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
          <p className="font-bold">جمع جزء</p>
          <p className="persian-font opacity-70">
            {totalPrice.toLocaleString()} تومان
          </p>
        </div>
        <div className="flex justify-between py-8 border border-solid border-white border-b-gray-200 dark:border-gray-900 dark:border-b-gray-700">
          <p className="font-bold">حمل و نقل</p>
          <p>
            ارسال <span className="font-bold">رایگان</span>
          </p>
        </div>
        <div className="flex justify-between py-8">
          <p className="font-bold">مجموع</p>
          <p className="persian-font text-rose-600 font-bold text-2xl dark:text-gray-100">
            {totalPrice.toLocaleString()} تومان
          </p>
        </div>
      </div>
      <Link className="text-center" to={"/checkout"}>
        <Button title={"ادامه جهت تسویه حساب"} />
      </Link>
    </div>
  );
}

export default ShoppingcartCosts;
