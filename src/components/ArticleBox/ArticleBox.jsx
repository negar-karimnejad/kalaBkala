import { Link } from "react-router-dom";

function ArticleBox(article) {
  const { id, title, description, src, category } = article;
  return (
    <>
      <div className="relative h-56">
        <div className="w-full h-full">
          <img loading="lazy" src={src[0]} alt={title} />
          <div className="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
        </div>
        <p className="absolute inset-x-0 mx-auto -bottom-5 bg-red-600 text-white w-fit p-1 text-base">
          {category}
        </p>
      </div>
      <div className="px-6 py-10 flex flex-col justify-between h-80">
        <div className="font-bold text-xl text-gray-700 dark:text-white dark:font-medium">
          {title}
        </div>
        <p className="leading-6 text-gray-700 text-[14px] dark:text-gray-400">
          {description}
        </p>
        <button>
          <Link
            to={`/${id + title.replaceAll(" ", "-")}`}
            className="text-rose-600 text-base font-bold dark:text-gray-100 dark:font-medium hover:text-rose-800 dark:hover:text-rose-500 dark:hover:font-bold"
          >
            ادامه مطلب
          </Link>
        </button>
      </div>
    </>
  );
}

export default ArticleBox;
