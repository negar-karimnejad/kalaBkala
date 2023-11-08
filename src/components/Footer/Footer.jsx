import { Link } from "react-router-dom";

function Footer() {
  const linkClickHandler = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className=" bg-gray-100 mt-[2rem] leading-[2.5rem] text-gray-500 text-[1.2rem] dark:bg-gray-800 dark:text-gray-400 dark:border dark:border-solid dark:border-gray-800 dark:border-t-gray-700">
      <div className="container">
        <div className="flex md:flex-nowrap flex-wrap gap-5 mb-8 py-10">
          <div className="w-fit md:w-4/12 lg:w-6/12">
            <h4 className="mt-3 font-bold text-gray-700 text-xl mb-7 dark:text-gray-200 dark:font-medium">
              معرفی کالا به کالا
            </h4>
            <p>
              فروشگاه اینترنتی کالا‌ بی کالا فعالیت خود را در بهمن 98 آغاز کرد و
              همیشه سعی داشته بهترین کالا را با بهترین قیمت در اختیار کاربران
              قرار دهد.
              <br />
              <br /> حوزه فعالیت این فروشگاه اینترنتی عطر ، ادکلن و عینک است.
              البته همچنان این فروشگاه در حال توسعه است تا هر روز بهترین کالا را
              در اختیار کاربران فراهم کند. بستر فروش اینترنتی در ایران بسیار
              مناسب است و کاربران می‌توانند از طریق سایت‌های مختلف محصولات خود
              را تهیه کنند که کالا بی کالا از همین رو به این بازار قدم گذاشته تا
              کاربران بتوانند بهترین محصولات را با بهترین قیمت تهیه کنند.
              <br />
              <br />
              شعار این مجموعه همیشه این بود : صداقت تنها آزمونی است که در آن
              تقلب نمی‌توان کرد.
            </p>
          </div>
          <div className="w-fit md:w-4/12 xl:w-3/12">
            <h4 className="mt-3 font-bold text-gray-700 text-xl mb-7 dark:text-gray-200 dark:font-medium">
              بخش های دیگر
            </h4>
            <ul>
              <li className="mb-5 transition-all hover:text-gray-700 dark:hover:text-rose-600">
                <Link
                  onClick={linkClickHandler}
                  to={"/products/category/perfume"}
                >
                  {" "}
                  خرید ادکلن ارزان
                </Link>
              </li>
              <li className="mb-5 transition-all hover:text-gray-700 dark:hover:text-rose-600">
                <Link onClick={linkClickHandler} to={"/post-tracking"}>
                  پیگیری مرسوله‌ها‌
                </Link>
              </li>
              <li className="mb-5 transition-all hover:text-gray-700 dark:hover:text-rose-600">
                <Link onClick={linkClickHandler} to={"/privacy-policy"}>
                  حریم خصوصی
                </Link>
              </li>
              <li className="mb-5 transition-all hover:text-gray-700 dark:hover:text-rose-600">
                <Link onClick={linkClickHandler} to={"/terms"}>
                  شرایط و قوانین مرجوعی
                </Link>
              </li>
              <li className="mb-5 transition-all hover:text-gray-700 dark:hover:text-rose-600">
                <Link onClick={linkClickHandler} to={"/about-us"}>
                  درباره ما
                </Link>
              </li>
              <li className="mb-5 transition-all hover:text-gray-700 dark:hover:text-rose-600">
                <Link to={""} className="persian-font">
                  شماره تماس : 09120359354 – 02191010958
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-fit md:w-3/12 lg:w-3/12">
            <h4 className="mt-3 font-bold text-gray-700 text-xl mb-7 dark:text-gray-200 dark:font-medium">
              مجوزها
            </h4>
            <div className="flex flex-wrap items-center justify-center">
              <img
                loading="lazy"
                src="/images/footer/logo.png"
                className="max-h-40 cursor-pointer"
                alt="logo"
              />
              <img
                loading="lazy"
                src="/images/footer/mojavez.svg"
                className="max-h-40 cursor-pointer"
                alt="mojavez"
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" border border-t-gray-300 border-solid border-gray-100 w-full py-5 px-2 dark:border-gray-800 dark:border-t-gray-700">
        <p className="container text-center md:text-lg text-sm text-gray-600 dark:text-gray-500">
          استفاده از مطالب فروشگاه اینترنتی کالا‌بی‌کالا فقط برای مقاصد غیرتجاری
          و با ذکر منبع بلامانع است. کلیه حقوق این سایت متعلق به فروشگاه
          اینترنتی کالا بی کالا می‌باشد.
        </p>
      </div>
    </div>
  );
}

export default Footer;
