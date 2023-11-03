import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import SocialMedia from "../../components/SocialMedia/SocialMedia";
import Footer from "../../components/Footer/Footer";
import Support from "../../components/Support/Support";

function Complaint() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      <Header />
      <Navbar />
      <div className="flex items-center justify-center flex-col m-auto text-center p-10 my-10 leading-8 text-xl dark:text-gray-100">
        <p>
          اگر نسبت به سفارش یا نوع محصول خود شکایتی دارید که نیاز دارید تا بررسی
          دقیق تری انجام گردد حتماً از فرم زیر استفاده کنید.
        </p>
        <br />
        <p>
          در صورت فعال نبودن فرم زیر، حتماً با شماره{" "}
          <span className="font-bold">09123456789</span> در ارتباط باشید.
        </p>
      </div>
      <SocialMedia />
      <Footer />
      <Support />
    </div>
  );
}

export default Complaint;
