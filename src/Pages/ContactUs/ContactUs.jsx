import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import SocialMedia from "../../components/SocialMedia/SocialMedia";
import Footer from "../../components/Footer/Footer";
import Support from "../../components/Support/Support";

function ContactUs() {
  return (
    <>
      <Header />
      <Navbar />
      <div className="text-center p-10 my-10 leading-10 text-xl dark:text-white">
        <p>ما همیشه منتظر شنیدن انتقادات و پیشنهادات شما هستیم.</p>
        <br />
        <p>
          اگر قصد ارتباط با پشتیبانی{" "}
          <span className="text-rose-600">کالا بی کالا</span> را دارید:
        </p>
        <br />
        <p>آدرس : تهران – سعادت آباد – کارخانه شکوه – کالا بی کالا</p>
        <p>تلفن : 02123456789 – 09123456789</p>
        <p>ایمیل : www.kalabkalaInfo.com</p>
      </div>
      <SocialMedia />
      <Footer />
      <Support />
    </>
  );
}

export default ContactUs;
