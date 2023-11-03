import { Form, Formik } from "formik";
import FormValidationField from "../../components/FormValidationField/FormValidationField";
import {
  useGetUserQuery,
  useSignOutUserMutation,
  useChangeUserMutation,
} from "../../Redux/store/users";
import * as Yup from "yup";

function AccountDetails() {
  const { data: session, isLoading: isAuthing } = useGetUserQuery();

  const initialValues = {
    fullname: "",
    email: "",
    phone: "",
    prevPassword: "",
    newPassword: "",
    confirmNewPassword: "",
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
    phone: Yup.string().trim(),
    prevPassword: Yup.string(),
    newPassword: Yup.string().matches(
      /^(?=.*[a-z])(?=.*\d).{8,}$/,
      "پسورد باید حداقل 8 کاراکتر, شامل حروف و اعداد باشد"
    ),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "مقادیر وارد شده در فیلدهای رمز عبور و تکرار رمز عبور یکسان نیستند."
    ),
  });

  return (
    <>
      {!isAuthing && (
        <Formik
          initialValues={{
            fullname: session?.session.user.user_metadata.fullname,
            email: session?.session.user.email,
            phone: session?.session.user.phone,
            prevPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-16 w-full p-5">
              <FormValidationField
                name="fullname"
                type="text"
                title="نام و نام خانوادگی"
              />
              <FormValidationField
                name="email"
                type="email"
                title="آدرس ایمیل"
              />
              <FormValidationField
                name="phone"
                type="text"
                title="شماره موبایل"
              />
              <fieldset className="p-8 pb-16 space-y-10 border-2 border-solid border-gray-300 dark:border-gray-700">
                <legend className="text-2xl font-bold px-4 dark:text-gray-200">
                  تغییر گذرواژه
                </legend>
                <div className="flex flex-col my-5 whitespace-nowrap">
                  <FormValidationField
                    name="prevPassword"
                    type="password"
                    title={
                      "گذرواژه پیشین (در صورتی که قصد تغییر ندارید خالی بگذارید)"
                    }
                  />
                </div>
                <div className="flex flex-col my-5 whitespace-nowrap">
                  <FormValidationField
                    name="newPassword"
                    type="password"
                    title={
                      "گذرواژه جدید (در صورتی که قصد تغییر ندارید خالی بگذارید)"
                    }
                  />
                </div>
                <div className="flex flex-col my-5">
                  <FormValidationField
                    name="confirmNewPassword"
                    type="password"
                    title={"تکرار گذرواژه جدید"}
                  />
                </div>
              </fieldset>
              <div>
                <button
                  className="bg-rose-600 text-white p-3 my-5 w-full hover:bg-rose-700"
                  type="submit"
                  // disabled={isSubmitting}
                >
                  ذخیره تغییرات
                  {/* {`${
                  isSubmitting ? "منتظر بمانید..." : "ذخیره تغییرات"
                }`} */}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}

export default AccountDetails;
