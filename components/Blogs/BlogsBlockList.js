import PillowLink from "@/components/ui/PillowLink";
import TitleH2 from "@/components/ui/TitleH2";
import Article from "@/components/ui/Article";
import ButtonPagination from "@/components/ui/ButtonPagination";
import { useEffect, useRef, useState } from "react";
import { Virtual, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "@/components/ui/Loading";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useTranslation from "next-translate/useTranslation";
import { fetchAPI } from "lib/api";

export default function BlogsBlockList({
  titleColor,
  articleColor,
  buttonColor,
}) {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const { t } = useTranslation("common");
  const i18n = useTranslation();

  const [data, setData] = useState();

  const locale = i18n.lang;

  useEffect(() => {
    async function fetchData() {
      const blogsRes = await fetchAPI("/blogs", {
        fields: ["Title", "slug", "Preview"],
        populate: ["tags", "Image_preview"],
        locale: locale,
      });

      setData(blogsRes.data);
    }
    fetchData();
  }, [locale]);

  if (!data) {
    return <Loading />;
  }

  return (
    <section
      className="text-white pt-20 pb-[38px]
    md:pb-20 md:pt-20
    lg:pb-20 lg:pt-33 container"
    >
      <div
        className="flex justify-between pb-10 items-center
        md:pb-15 lg:pb-18"
      >
        <TitleH2
          text={t("Blog invert_1")}
          subtext="invert"
          variant={titleColor}
        />

        <div className="flex">
          <div ref={navigationPrevRef}>
            <ButtonPagination variant={buttonColor}>
              <svg
                className='w-[9px] h-[15px] viewBox="0 0 9 15'
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.15625 14.1055L1.84046 7.39494L8.15625 0.684416"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </ButtonPagination>
          </div>
          <div ref={navigationNextRef}>
            <ButtonPagination variant={buttonColor}>
              <svg
                className='w-[9px] h-[15px] viewBox="0 0 9 15 rotate-180'
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.15625 14.1055L1.84046 7.39494L8.15625 0.684416"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </ButtonPagination>
          </div>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Virtual, Pagination]}
        spaceBetween={50}
        slidesPerView={3}
        scrollbar={{ draggable: true }}
        onSlideChange={() => console.log("slide change")}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }}
        virtual
        className="!-mr-3.8 flex pb-7 gap-2.5
      md:pb-10 md:gap-7
      lg:pl-0 lg:pb-9"
      >
        {data[0] &&
          data.map((blog, key) => (
            <SwiperSlide key={key} className="shrink-0">
              <Article
                image={blog.attributes.Image_preview}
                link={blog.attributes.slug}
                tag="VR"
                title={blog.attributes.Title}
                text={blog.attributes.Preview}
                variant={articleColor}
              />
            </SwiperSlide>
          ))}
      </Swiper>

      <div className="mt-7">
        <PillowLink
          text={t("All_news")}
          link="/blogs"
          variant="dark"
          variantSvg="whiteSvg"
        />
      </div>
    </section>
  );
}
