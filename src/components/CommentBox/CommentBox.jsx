import { FaStar } from "react-icons/fa";

function CommentBox({ author, date, content, rating }) {
  return (
    <div className="text-lg p-5 border border-solid border-gray-100 shadow-md shadow-gray-200 dark:shadow-gray-950 dark:border-gray-700 dark:text-gray-300">
      <div className="flex justify-between">
        <p className="font-bold text-xl">{author}:</p>
        <p>{date}</p>
      </div>
      <div className="my-5">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <button key={index}>
              <FaStar
                size={15}
                className={
                  ratingValue <= rating ? "text-[#ffe101]" : "text-[#ccc]"
                }
              />
            </button>
          );
        })}
      </div>
      <div>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default CommentBox;
