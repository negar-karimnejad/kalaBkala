import SocialMedia from "../../components/SocialMedia/SocialMedia";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Support from "../../components/Support/Support";

function NotFound() {
  return (
    <>
      <Header />
      <Navbar />
      <div className="text-xl w-full h-96 flex flex-col items-center justify-center mt-10 dark:text-gray-300">
        <div
          className="flex items-center justify-center relative persian-font before:content-['404'] before:absolute before:w-fit before:h-fit before:top-24 before:opacity-50 before
        left-0 before:text-gray-200 before:font-bold before:text-[11rem]  before:dark:text-gray-700"
        >
          <h2 className="text-5xl font-bold text-rose-700 mt-20 mr-6 z-10 dark:text-gray-50">
            یافت نشد
          </h2>
        </div>
        <p className="font-bold mt-20">
          چیزی که دنبال آن بودید اینجا پیدا نشد.
        </p>
        <span className="fa fa-frown-o text-[10rem] opacity-70"></span>
      </div>
      <SocialMedia />
      <Footer />
      <Support />
    </>
  );
}

export default NotFound;
