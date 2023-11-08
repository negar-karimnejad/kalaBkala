import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetAllProductsQuery } from "../../Redux/store/allProducts";
import ProductBox from "../ProductBox/ProductBox";
import "swiper/css";
import "swiper/css/pagination";
import "./RandomProducts.css";

function RandomProducts() {
  const [randomProducts, setRandomProducts] = useState([]);
  const { data: allProducts, isLoading } = useGetAllProductsQuery();

  const fetchRandomProducts = () => {
    if (!isLoading) {
      const randomProducts = [];
      while (randomProducts.length < 8) {
        const randomIndex = Math.floor(Math.random() * allProducts.length);
        const randomProduct = allProducts[randomIndex];
        if (!randomProducts.includes(randomProduct)) {
          randomProducts.push(randomProduct);
        }
      }
      setRandomProducts(randomProducts);
    }
  };

  useEffect(() => {
    fetchRandomProducts();
  }, [allProducts]);

  return (
    <div className="randomProducts">
      <h2 className="text-center font-bold text-3xl mb-10 dark:text-white">
        محصولات اتفاقی
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
        {randomProducts?.map((product) => (
          <SwiperSlide key={product.id} className="dark:bg-gray-800">
            {isLoading ? (
              <ScreenLoader />
            ) : (
              <div className="flex flex-col border border-solid border-gray-100 shadow-lg shadow-gray-300 h-[35rem] bg-white rounded-lg overflow-hidden dark:shadow-gray-950">
                <ProductBox {...product} />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default RandomProducts;
