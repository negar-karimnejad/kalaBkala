import SocialMedia from "../../components/SocialMedia/SocialMedia";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Support from "../../components/Support/Support";

function Tracking() {
  return (
    <>
      <Header />
      <Navbar />
      <div className=" flex justify-center items-center p-10">
        <form
          className="rounded-2xl text-lg shadow-xl w-96 border border-solid border-gray-200 px-10 py-10 space-y-5 flex flex-col items-center justify-center dark:bg-gray-900 dark:border-gray-700"
          onSubmit={(e) => e.preventDefault()}
        >
          <img
            loading="lazy"
            src="../../../images/tracking/order.gif"
            alt="order"
            className="dark:rounded-lg"
          />
          <label className="pt-2 dark:text-gray-200">
            لطفاً شماره سفارش خود را وارد کنید
          </label>
          <input
            placeholder="*********09"
            required
            type="text"
            className="persian-font focus:ring-0 focus:outline-0 border-0 bg-gray-100 w-full p-3 rounded-lg dark:bg-gray-800 dark:text-gray-100"
          />
          <button
            type="submit"
            className="rounded-lg bg-black text-white w-full py-2 transition-all hover:bg-rose-500 hover:shadow-lg hover:shadow-rose-600 hover:-translate-x-0.5 dark:bg-gray-950 dark:hover:bg-gray-950 dark:hover:shadow-gray-950"
          >
            رهگیری
          </button>
        </form>
      </div>
      <SocialMedia />
      <Footer />
      <Support />
    </>
  );
}

export default Tracking;
