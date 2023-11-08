import { FiHeart } from "react-icons/fi";
import Button from "../../components/Button/Button";

function Favorites() {
  return (
    <div className=" p-5 flex flex-col items-center dark:text-gray-200 text-center">
      <FiHeart className="text-9xl opacity-10 scale-150 mb-10 dark:opacity-50 dark:text-rose-500" />
      <p className="lg:text-5xl text-3xl font-bold">این لیست علاقه مندی خالی است.</p>
      <p className="my-8 text-xl">
        باید محصولی را جهت قرار دادن در این لیست انتخاب کنید.
      </p>
      <Button title={"بازگشت به فروشگاه"} />
    </div>
  );
}

export default Favorites;
