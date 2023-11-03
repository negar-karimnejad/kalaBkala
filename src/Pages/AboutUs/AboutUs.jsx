import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import SocialMedia from "../../components/SocialMedia/SocialMedia";
import Support from "../../components/Support/Support";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <>
      <Header />
      <Navbar />
      <div className="p-10 text-xl space-y-8 leading-10 border border-solid border-white border-b-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-800 dark:border-b-gray-700">
        <p>
          فروشگاه اینترنتی کالا‌ بی کالا فعالیت خود را در بهمن 98 آغاز کرد و
          همیشه سعی داشته بهترین کالا را با بهترین قیمت در اختیار کاربران قرار
          دهد.
        </p>
        <p>
          حوزه فعالیت این فروشگاه اینترنتی عطر ، ادکلن و عینک است. البته همچنان
          این فروشگاه در حال توسعه است تا هرروز بهترین کالا را در اختیار کاربران
          فراهم کند. بستر فروش اینترنتی در ایران بسیار مناسب است و کاربران
          می‌توانند از طریق سایت‌های مختلف محصولات خود را تهیه کنند که{" "}
          <Link className="text-rose-600" to={"/"}>
            کالا بی کالا
          </Link>{" "}
          از همین رو به این بازار قدم گذاشته تا کاربران بتوانند بهترین محصولات
          را با بهترین قیمت تهیه کنند.
        </p>
        <p>
          شعار این مجموعه همیشه این بود : صداقت تنها آزمونی است که در آن تقلب
          نمی‌توان کرد.
        </p>
      </div>
      <SocialMedia />
      <Footer />
      <Support />
    </>
  );
}

export default AboutUs;
