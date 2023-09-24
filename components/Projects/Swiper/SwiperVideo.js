import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Thumbs } from "swiper/modules";
import { VideoPlayer } from "../VideoPlayer";

export const SwiperVideo = ({ videoSlides, poster }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  console.log(poster);
  return (
    <>
      <Swiper
        loop={true}
        slidesPerView={1}
        modules={[Thumbs]}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
      >
        {videoSlides.map((video, index) => (
          <SwiperSlide key={index}>
            <VideoPlayer poster={poster?.data} videofile={video} />
          </SwiperSlide>
        ))}
      </Swiper>

      {videoSlides.length > 1 && (
        <div className="2xl:pt-12 xl:pt-12 lg:pt-7 pt-2 z-5">
          <Swiper
            slidesPerView={2}
            breakpoints={{
              768: {
                spaceBetween: 30,
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
            }}
            spaceBetween={30}
            scrollbar={{ draggable: true }}
            loop={true}
            onSwiper={setThumbsSwiper}
          >
            {videoSlides.map((video, index) => (
              <SwiperSlide key={index}>
                <div className="rounded-lr overflow-hidden">
                  <VideoPlayer poster={null} videofile={video} small={true} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};
