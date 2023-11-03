import Swal from "sweetalert2";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import FormValidationField from "../FormValidationField/FormValidationField";

function FormValidation() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    fullname: "",
    state: "",
    city: "",
    address: "",
    phone: "",
    postCode: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
      .required("نام و نام خانوادگی ضروری است")
      .min(5, "نام و نام خانوادگی حداقل باید 5 کاراکتر داشته باشد")
      .trim(),
    state: Yup.string().required("فیلد استان ضروری است").trim(),
    city: Yup.string().required("فیلد شهر ضروری است").trim(),
    address: Yup.string().required("فیلد آدرس ضروری است").trim(),
    phone: Yup.string()
      .required("فیلد شماره تماس ضروری است")
      .length(11, "شماره موبایل معتبر نیست")
      .trim(),
    postCode: Yup.string()
      .required("فیلد کدپستی ضروری است")
      .length(10, "کدپستی باید 10 رقمی باشد")
      .trim(),
    email: Yup.string()
      .email("ایمیل نامعتبر است")
      .required("ایمیل ضروری است")
      .trim(),
  });

  const registerOrder = async (values, { resetForm }) => {
    Swal.fire({
      title: "آیا میخواهید سفارش خود را ثبت کنید؟",
      position: "center",
      showConfirmButton: true,
      toast: false,
      customClass: { icon: "m-auto mt-2" },
      showDenyButton: true,
      icon: "question",
      confirmButtonText: "بله",
      denyButtonText: "نه!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          customClass: { icon: "m-auto mt-4" },
          toast: false,
          position: "center",
          icon: "success",
          title: "سفارش شما با موفقیت ثبت شد",
          showConfirmButton: false,
          timer: 4000,
        }).then(() => {
          setIsSubmitting(false);
          resetForm();
        });
      }
    });
  };

  return (
    <Formik
      initialValues={{
        fullname: "",
        state: "",
        city: "",
        address: "",
        phone: "",
        postCode: "",
        email: "",
      }}
      validationSchema={validationSchema}
      onSubmit={registerOrder}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-9 w-full p-5 flex flex-col justify-around h-full dark:text-gray-100">
          <FormValidationField
            title={"نام و نام خانوادگی"}
            type="text"
            name="fullname"
          />
          <FormValidationField title={"استان"} type="text" name="state" />
          <FormValidationField title={"شهر"} type="text" name="city" />
          <FormValidationField title={"آدرس"} type="text" name="address" />
          <FormValidationField
            title={"شماره موبایل"}
            type="text"
            name="phone"
          />
          <FormValidationField title={"کدپستی"} type="text" name="postCode" />
          <FormValidationField title={"ایمیل"} type="email" name="email" />
          <div className="text-center mt-10 mb-5">
            <button
              className="bg-rose-600 text-white p-3 my-5 w-full hover:bg-rose-700"
              type="submit"
              disabled={isSubmitting}
            >{`${isSubmitting ? "در حال پردازش..." : "ثبت سفارش"}`}</button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default FormValidation;
