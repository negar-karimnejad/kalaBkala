import { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useUpdateProductRatingMutation } from "../../Redux/store/allProducts";
import {
  useAddToCommentsMutation,
  useGetOneCommentQuery,
} from "../../Redux/store/comments";
import { useGetUserQuery } from "../../Redux/store/users";
import Comments from "../Comments/Comments";
import ScreenLoader from "../ScreenLoader/ScreenLoader";
import Swal from "sweetalert2";
import Star from "../Star/Star";

function CommentsBar({ productName, productID, productRating }) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(4);
  const [randomNumberTwo, setRandomNumberTwo] = useState(
    Math.floor(Math.random() * 10)
  );
  const [randomNumberOne, setRandomNumberOne] = useState(
    Math.floor(Math.random() * 10)
  );
  const [isShowAuthor, setIsShowAuthor] = useState(true);
  const [userResult, setUserResult] = useState(null);
  const { data: session } = useGetUserQuery();
  const { data: comments, isLoading } = useGetOneCommentQuery(productID);
  const [addComment, isSuccess] = useAddToCommentsMutation();
  const [updateRating] = useUpdateProductRatingMutation();

  const commentSubmitHandler = (e) => {
    e.preventDefault();
    let newRating = (productRating + rating) / 2;
    let result = randomNumberOne + randomNumberTwo;
    if (result === Number(userResult)) {
      if (content.length < 10) {
        Swal.fire({
          text: "متن پیام کوتاه است",
          toast: true,
          timer: 4000,
          position: "top-right",
          showConfirmButton: false,
          icon: "warning",
        });
      } else {
        addComment({
          productID,
          content,
          rating,
          author: isShowAuthor
            ? session.session.user.user_metadata.fullname
            : "ناشناس",
          authorEmail: session.session.user.email,
        });

        updateRating({ productID, newRating });
        if (isSuccess) {
          Swal.fire({
            text: "دیدگاه شما با موفقیت ارسال شد👍",
            toast: true,
            timer: 4000,
            position: "top-right",
            showConfirmButton: false,
            icon: "success",
          }).then(() => {
            setContent("");
            setUserResult("");
            setRandomNumberOne(Math.floor(Math.random() * 10));
            setRandomNumberTwo(Math.floor(Math.random() * 10));
          });
        }
      }
    } else {
      Swal.fire({
        text: "جمع اعداد صحیح نیست",
        toast: true,
        timer: 4000,
        position: "top-right",
        showConfirmButton: false,
        icon: "error",
      });
    }
  };

  return (
    <div className="w-full bg-white h-full dark:bg-gray-900 p-5 dark:text-gray-200">
      <div className="flex flex-col">
        <h4 className="font-bold text-lg">نقد و بررسی ها</h4>
        {isLoading ? (
          <ScreenLoader />
        ) : (
          <>
            {comments?.length ? (
              <Comments productID={productID} />
            ) : (
              <p className="bg-emerald-600 text-white p-5 rounded-xl mt-8 text-xl">
                هنوز هیچ نظری ثبت نشده است.
              </p>
            )}
          </>
        )}
        <div className="px-5 py-10 rounded-md border-2 border-solid border-gray-300 mt-20 dark:border-gray-700">
          <h5 className="font-bold">
            {`${
              comments?.length
                ? `دیدگاه خود را درمورد “ ${productName} ” بیان کنید. `
                : `اولین کسی باشید برای “ ${productName} ” که دیدگاهی می نویسد. `
            }`}
          </h5>
          <div className="my-5">
            <p className="font-bold mb-2">امتیاز شما *</p>
            <Star rating={rating} setRating={setRating} />
          </div>
          <p>دیدگاه شما *</p>
          <form onSubmit={commentSubmitHandler}>
            <textarea
              className="my-2 p-5 w-full border-gray-200 shadow-inner focus:ring-0 focus:border-gray-200 dark:bg-gray-500 dark:border-gray-700"
              name=""
              id=""
              cols="30"
              rows="10"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <div className="flex font-bold">
              <input
                type="checkbox"
                id="showName"
                value={""}
                checked={isShowAuthor ? true : false}
                onChange={() => setIsShowAuthor(!isShowAuthor)}
                className="me-2 focus:ring-0 focus:border-gray-500"
              />
              <label
                htmlFor="showName"
                className="text-sm sm:text-base whitespace-nowrap"
              >
                نمایش نام شما
              </label>
            </div>
            <p className="mt-10 font-bold">
              لطفا پاسخ را به عدد انگلیسی وارد کنید:
            </p>
            <p className="persian-font font-bold mt-5">
              {randomNumberOne} + {randomNumberTwo} =
            </p>
            <Input
              value={userResult}
              onChange={(e) => setUserResult(e.target.value)}
            />
            <div className="my-5 w-20">
              <Button title="ثبت" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommentsBar;
