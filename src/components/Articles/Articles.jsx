import { Swiper, SwiperSlide } from "swiper/react";
import ArticleBox from "../ArticleBox/ArticleBox";
import { useGetArticlesQuery } from "../../Redux/store/articles";
import ScreenLoader from "../ScreenLoader/ScreenLoader";
import "swiper/css";
import "swiper/css/pagination";
import "./Articles.css";

function Articles() {
  const { data: articles, isLoading } = useGetArticlesQuery();

  return (
    <div className="articles">
      <h2 className="text-center font-bold text-3xl my-5 dark:text-white">
        مقالات
      </h2>
      <Swiper
        spaceBetween={30}
        breakpoints={{
          0: {
            slidesPerView: 1.5,
          },
          580: {
            slidesPerView: 2,
          },
          750: {
            slidesPerView: 2.5,
          },
          900: {
            slidesPerView: 3,
          },
          1100: {
            slidesPerView: 4,
          },
        }}
        className="mySwiper"
      >
        {!isLoading &&
          articles.map((article) => (
            <SwiperSlide key={article.id}>
              {isLoading ? (
                <ScreenLoader />
              ) : (
                <div className="h-[34rem] overflow-hidden rounded shadow-lg shadow-gray-300 dark:shadow-gray-950 dark:bg-gray-700">
                  <ArticleBox {...article} />
                </div>
              )}
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default Articles;
