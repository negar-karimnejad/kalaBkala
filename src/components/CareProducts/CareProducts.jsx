import { Swiper, SwiperSlide } from "swiper/react";
import { useGetProductsCategoryQuery } from "../../Redux/store/allProducts";
import ProductBox from "../ProductBox/ProductBox";
import "swiper/css";
import "swiper/css/pagination";
import "./CareProducts.css";

function CareProducts() {
  const { data: careProducts, isLoading } =
    useGetProductsCategoryQuery("skin-care");

  return (
    <div className="care-products">
      <h2 className="text-center font-bold text-3xl mb-5 dark:text-white">
        مراقبتی و بهداشتی
      </h2>
      <Swiper
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
          careProducts?.map((product) => (
            <SwiperSlide key={product.id} className="dark:bg-gray-800">
              <div className="flex flex-col border border-solid border-gray-100 shadow-lg shadow-gray-300 h-[35rem] bg-white rounded-lg overflow-hidden dark:shadow-gray-950">
                <ProductBox {...product} />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default CareProducts;
