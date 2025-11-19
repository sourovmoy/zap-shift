import React from "react";
import img1 from "../../assets/banner/banner1.png";
import img2 from "../../assets/banner/banner2.png";
import img3 from "../../assets/banner/banner3.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

const Banner = () => {
  return (
    <div className="mt-10">
      <Carousel autoPlay={true} infiniteLoop={true} interval={2000}>
        <div className="relative w-full">
          {/* IMAGE */}
          <img className="w-full" src={img1} />

          {/* BUTTONS OVER IMAGE */}
          <div className="absolute bottom-2 sm:bottom-16 left-3 sm:left-10 flex items-center gap-3 z-10">
            <button className="btn-primary px-2 sm:px-5 py-1 sm:py-3 rounded-xl text-white">
              Track Your Parcel
            </button>

            <button className="">
              <BsFillArrowUpRightCircleFill size={40} />
            </button>

            <button className="btn bg-white rounded-2xl px-2 sm:px-5 py-1 sm:py-3 text-black">
              Be A Rider
            </button>
          </div>
        </div>
        <div className="relative w-full">
          {/* IMAGE */}
          <img className="w-full" src={img2} />

          {/* BUTTONS OVER IMAGE */}
          <div className="absolute bottom-2 sm:bottom-16 left-3 sm:left-10 flex items-center gap-3 z-10">
            <button className="btn-primary px-2 sm:px-5 py-1 sm:py-3 rounded-xl text-white">
              Track Your Parcel
            </button>

            <button>
              <BsFillArrowUpRightCircleFill size={40} />
            </button>

            <button className="btn bg-white rounded-2xl px-2 sm:px-5 py-1 sm:py-3 text-black">
              Be A Rider
            </button>
          </div>
        </div>
        <div className="relative w-full">
          {/* IMAGE */}
          <img className="w-full" src={img3} />

          {/* BUTTONS OVER IMAGE */}
          <div className="absolute bottom-2 sm:bottom-16 left-3 sm:left-10 flex items-center gap-3 z-10">
            <button className="btn-primary px-2 sm:px-5 py-1 sm:py-3 rounded-xl text-white">
              Track Your Parcel
            </button>

            <button>
              <BsFillArrowUpRightCircleFill size={40} />
            </button>

            <button className="btn bg-white rounded-2xl px-2 sm:px-5 py-1 sm:py-3 text-black">
              Be A Rider
            </button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
