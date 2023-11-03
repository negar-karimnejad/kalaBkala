import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignInUserMutation } from "../../Redux/store/users";
import Support from "../../components/Support/Support";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, seIsShowPassword] = useState(false);

  const [signInUser, { isLoading }] = useSignInUserMutation();

  const signInHandler = async (e) => {
    e.preventDefault();

    try {
      await signInUser({ email, password }).unwrap();
      Swal.fire({
        text: "با موفقیت وارد شدید",
        toast: true,
        timer: 3000,
        position: "top-right",
        showConfirmButton: false,
        icon: "success",
      }).then(() => {
        navigate(-1);
      });
    } catch (err) {
      Swal.fire({
        text: "ورودی نامعتبر است",
        toast: true,
        timer: 3000,
        position: "top-right",
        showConfirmButton: false,
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className="bg-rose-50 flex flex-col items-center justify-between w-screen h-screen py-6 dark:bg-gray-800">
        <Link to={"/"} title="کالا بی کالا">
          <img
            loading="lazy"
            src="../../../images/header/KalaBKala.webp"
            alt="KalaBKala"
            className="w-60 rounded-md p-2 dark:bg-gray-500"
          />
        </Link>
        <div className="relative rounded-3xl flex flex-col items-center justify-between w-[400px] h-96 my-5 py-5 bg-white shadow-2xl dark:bg-gray-500">
          <h4 className="w-full text-center text-3xl text-gray-700 font-bold dark:text-white">
            ورود
          </h4>
          <span className="w-full text-lg text-center text-gray-500 dark:text-gray-100">
            حساب کاربری ندارید؟
            <Link
              to={"/register"}
              className="text-rose-500 font-bold dark:text-gray-800 hover:text-rose-600 dark:hover:text-gray-950"
            >
              {" "}
              ثبت نام کنید
            </Link>
          </span>
          <form
            onSubmit={signInHandler}
            className="space-y-7 w-full p-5 flex flex-col"
          >
            <div className="space-y-3">
              <div className="relative flex items-center h-14">
                <Input
                  placeholder={"آدرس ایمیل"}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type={"email"}
                />
                <span className="fa fa-envelope absolute left-4 text-gray-500"></span>
              </div>
              <div className="relative flex items-center h-14">
                <Input
                  placeholder={"رمز عبور"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={`${isShowPassword ? "text" : "password"}`}
                />
                <span
                  title="Show Password"
                  className={`${
                    isShowPassword ? "fa fa-eye" : "fa fa-eye-slash"
                  } absolute left-4 text-gray-500 cursor-pointer text-lg font-bold`}
                  onClick={() => seIsShowPassword(!isShowPassword)}
                ></span>
              </div>
            </div>
            <Button
              title={`${isLoading ? "در حال تایید..." : "تایید"}`}
              className="bg-rose-700 text-white p-2"
              type="submit"
              disabled={isLoading}
            ></Button>
          </form>
        </div>
        <div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            با عضویت در سایت، تمامی{" "}
            <Link to={"/terms"} className="text-gray-400 hover:text-rose-600">
              قوانین و شرایط
            </Link>{" "}
            را پذیرفته اید.
          </p>
        </div>
      </div>
      <Support />
    </>
  );
}

export default Login;
