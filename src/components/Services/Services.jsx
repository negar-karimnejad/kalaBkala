import Service from "../Service/Service";

function Services() {
  return (
    <div className="gap-x-2 gap-y-14 flex flex-wrap border border-solid border-white border-b-gray-200 pt-5 pb-14 px-5 mt-10 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700">
      <Service
        src="../../../images/services/post.svg"
        title="تحویل فوری"
        caption="سفارشات با پیک و پست ارسال می گردد."
      />
      <Service
        src="../../../images/services/ghest.svg"
        title="پرداخت اقساطی و آنلاین"
        caption="سفارشات خود را اقساطی یا آنلاین پرداخت کنید."
      />
      <Service
        src="../../../images/services/guarantee.svg"
        title="ضمانت اصالت کالا​"
        caption="تمامی محصولات ضمانت اصالت کالا دارند."
      />
      <Service
        src="../../../images/services/return.svg"
        title="7 روز گارانتی بازگشت وجه"
        caption="لینک شرایط مرجوعی کالا"
      />
    </div>
  );
}

export default Services;
