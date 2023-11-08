import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing">
      <div className="flex gap-0 md:gap-5 items-center">
        <div className="w-full md:w-4/12">
          <img
            loading="lazy"
            src="/images/landing/1.webp"
            className="rounded-3xl"
            alt="fresh"
          />
        </div>
        <div className="w-full md:w-8/12">
          <Swiper
            loop={true}
            navigation={true}
            speed={900}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
          >
            {[...Array(6)].map((_, index) => {
              const imageIndex = index + 1;
              return (
                <SwiperSlide key={index}>
                  <img
                    loading="lazy"
                    src={`/images/landing/${imageIndex}.jpg`}
                    alt="landing-img"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Landing;
