import { SwiperSlide, Swiper } from "swiper/react";
import { useRef } from "react";
import { Pagination, Autoplay } from "swiper";
import { Link } from "react-router-dom";
import classes from "./Landing.module.css";
import "../../images/back1.jpg";
import "swiper/css";
// import "swiper/css/navigation";
import "swiper/css/pagination";

const Landing = () => {
  const firstSlide = useRef();
  const secondSlide = useRef();

  return (
    <div className={classes.landing}>
      <Swiper
        spaceBetween={50}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1200}
        className="mySwiper"
        pagination={true}
        onSlideChange={({ realIndex: r, previousIndex: p }) => {
          if (r === 0) {
            firstSlide.current.classList.add(classes.active);
            secondSlide.current.classList.remove(classes.active);
          } else {
            firstSlide.current.classList.remove(classes.active);
            secondSlide.current.classList.add(classes.active);
          }
        }}
      >
        <SwiperSlide className={`${classes["swiper-slide"]} ${classes.first}`}>
          <div className="container">
            <div className={`${classes.details}`} ref={firstSlide}>
              <h1 className={`${classes.title} text-capitalize fw-bold`}>
                Boat Headphone Sets
              </h1>
              <p className={`${classes.detail} text-uppercase `}>Sale Offer</p>
              <p className={`text-black-50 mb-4 ${classes.desc}`}>
                Lorem ipsum dolor sit amet consectetur.
              </p>
              <Link
                to={"/shop"}
                className={`${classes.btn} text-capitalize  fw-bold px-lg-3 py-lg-2 px-2 py-1 `}
              >
                shop now
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={`${classes["swiper-slide"]} ${classes.second}`}>
          <div className="container">
            <div className={`${classes.details} `} ref={secondSlide}>
              <h1 className={`${classes.title} text-capitalize fw-bold`}>
                Boat Headphone Sets
              </h1>
              <p className={`${classes.detail} text-uppercase `}>Sale Offer</p>
              <p className={`text-black-50 mb-4 ${classes.desc}`}>
                Lorem ipsum dolor sit amet consectetur.
              </p>
              <Link
                className={`${classes.btn} text-capitalize fw-bold px-lg-3 py-lg-2 px-2 py-1`}
                to={"/shop"}
              >
                shop now
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Landing;
