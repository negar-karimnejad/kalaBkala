import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSignUpUserMutation } from "../../Redux/store/users";
import Support from "../../components/Support/Support";
import Swal from "sweetalert2";
import * as Yup from "yup";

function Register() {
  const navigate = useNavigate();

  const [isShowPassword, seIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [addNewUser, { error }] = useSignUpUserMutation();

  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
      .required("نام و نام خانوادگی ضروری است")
      .min(5, "نام و نام خانوادگی حداقل باید 5 کاراکتر داشته باشد")
      .trim(),
    email: Yup.string()
      .email("ایمیل نامعتبر است")
      .required("ایمیل ضروری است")
      .trim(),
    password: Yup.string()
      .required("رمز عبور ضروری است")
      .matches(
        /^(?=.*[a-z])(?=.*\d).{8,}$/,
        "پسورد باید حداقل 8 کاراکتر, شامل حروف و اعداد باشد"
      ),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "مقادیر وارد شده در فیلدهای رمز عبور و تکرار رمز عبور یکسان نیستند."
      )
      .required("تایید رمز عبور ضروری است"),
  });

  const registerUser = async (values, { resetForm }) => {
    try {
      await addNewUser(values).unwrap();
      Swal.fire({
        title: "ثبت نام با موفقیت انجام شد",
        toast: false,
        position: "center",
        showConfirmButton: true,
        icon: "success",
        customClass: { icon: "m-auto mt-4" },
        confirmButtonText: "باشه",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsSubmitting(false);
          navigate("/");
          resetForm();
        }
      });
    } catch (err) {
      if (error?.message === "User already registered") {
        Swal.fire({
          text: "این ایمیل قبلا در سایت ثبت نام کرده است",
          toast: true,
          timer: 5000,
          position: "top-right",
          showConfirmButton: false,
          icon: "error",
        });
      }
      console.error(err);
    }
  };

  return (
    <>
      <div className="bg-rose-50 grid place-content-center w-screen h-screen py-10 dark:bg-gray-800">
        <Link to={"/"} title="کالا بی کالا">
          <img
            loading="lazy"
            src="../../../images/header/KalaBKala.webp"
            alt="KalaBKala"
            className="w-60 rounded-md p-2 dark:bg-gray-500 m-auto"
          />
        </Link>
        <div className="rounded-3xl sm:w-[400px] w-[320px] h-full my-5 py-4 bg-white shadow-2xl dark:bg-gray-500">
          <h4 className="w-full text-center mb-2 text-3xl text-gray-700 font-bold dark:text-gray-50">
            عضویت
          </h4>
          <p className="text-center text-lg text-gray-500 dark:text-gray-50">
            قبلا ثبت نام کرده اید؟
            <Link
              to={"/login"}
              className="text-rose-600text-rose-500 font-bold dark:text-gray-800 hover:text-rose-600 dark:hover:text-gray-950"
            >
              {" "}
              وارد شوید
            </Link>
          </p>
          <Formik
            initialValues={{
              fullname: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={registerUser}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4 w-full p-5">
                <div className="relative flex flex-col h-14 my-2">
                  <div className="flex items-center">
                    <Field
                      className="rounded-lg border-2 border-gray-200 border-solid p-2 focus:ring-0 focus:border-gray-300 w-full h-full text-xl dark:bg-gray-800 dark:border-gray-500 dark:text-gray-100"
                      type="text"
                      name="fullname"
                      placeholder="نام و نام خانوادگی"
                    />
                    <span className="fa fa-user absolute left-4 text-gray-500"></span>
                  </div>
                  <ErrorMessage
                    className="text-xs text-red-500 mb-1 dark:text-gray-50"
                    name="fullname"
                    component="div"
                  />
                </div>
                <div className="relative flex flex-col h-14 my-2">
                  <div className="flex items-center">
                    <Field
                      className="rounded-lg border-2 border-gray-200 border-solid p-2 focus:ring-0 focus:border-gray-300 w-full h-full text-xl dark:bg-gray-800 dark:border-gray-500 dark:text-gray-100"
                      type="email"
                      name="email"
                      placeholder="آدرس ایمیل"
                    />
                    <span className="fa fa-envelope absolute left-4 text-gray-500"></span>
                  </div>
                  <ErrorMessage
                    className="text-xs text-red-500 mb-1 dark:text-gray-50"
                    name="email"
                    component="div"
                  />
                </div>
                <div className="relative flex flex-col h-14 my-2">
                  <div className="flex items-center">
                    <Field
                      className="rounded-lg border-2 border-gray-200 border-solid p-2 focus:ring-0 focus:border-gray-300 w-full h-full text-xl dark:bg-gray-800 dark:border-gray-500 dark:text-gray-100"
                      type={`${isShowPassword ? "text" : "password"}`}
                      name="password"
                      placeholder="رمز عبور"
                    />
                    <span
                      title="Show Password"
                      className={`${
                        isShowPassword ? "fa fa-eye" : "fa fa-eye-slash"
                      } absolute left-4 text-gray-500 cursor-pointer`}
                      onClick={() => seIsShowPassword(!isShowPassword)}
                    ></span>
                  </div>
                  <ErrorMessage
                    className="text-xs text-red-500 mb-1 dark:text-gray-50"
                    name="password"
                    component="div"
                  />
                </div>
                <div className="relative flex flex-col h-14 my-2 mb-5">
                  <div className="flex items-center">
                    <Field
                      className="rounded-lg border-2 border-gray-200 border-solid p-2 focus:ring-0 focus:border-gray-300 w-full h-full text-xl dark:bg-gray-800 dark:border-gray-500 dark:text-gray-100"
                      type={`${isShowConfirmPassword ? "text" : "password"}`}
                      name="confirmPassword"
                      placeholder="تکرار رمز عبور"
                    />
                    <span
                      title="Show Password"
                      className={`${
                        isShowConfirmPassword ? "fa fa-eye" : "fa fa-eye-slash"
                      } absolute left-4 text-gray-500 cursor-pointer`}
                      onClick={() =>
                        setIsShowConfirmPassword(!isShowConfirmPassword)
                      }
                    ></span>{" "}
                  </div>
                  <ErrorMessage
                    className="text-xs text-red-500 mb-1 dark:text-gray-50"
                    name="confirmPassword"
                    component="div"
                  />
                </div>
                <div>
                  <button
                    className="bg-rose-700 rounded-lg text-white p-3 w-full shadow-rose-300 shadow-lg dark:bg-gray-600 dark:hover:bg-gray-900 dark:shadow-gray-950"
                    type="submit"
                    disabled={isSubmitting}
                  >{`${isSubmitting ? "در حال تایید..." : "تایید"}`}</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="mt-8">
          <p className="sm:text-lg text-gray-600 dark:text-gray-300">
            با عضویت در سایت، تمامی{" "}
            <Link to={"/terms"} className="text-gray-400 hover:text-rose-600">
              قوانین و شرایط
            </Link>{" "}
            را پذیرفته اید.
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
