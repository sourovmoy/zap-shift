import React from "react";
import Marquee from "react-fast-marquee";
import img1 from "../../assets/brands/amazon.png";
import img2 from "../../assets/brands/amazon_vector.png";
import img3 from "../../assets/brands/casio.png";
import img4 from "../../assets/brands/moonstar.png";
import img5 from "../../assets/brands/randstad.png";
import img6 from "../../assets/brands/star.png";
import img7 from "../../assets/brands/start_people.png";

const Colaboration = () => {
  const logos = [img1, img2, img3, img4, img5, img6, img7];
  return (
    <div className="mt-10 sm:mt-20 mb-10 sm:mb-20">
      <Marquee>
        {logos.map((logo, index) => (
          <div className="flex justify-center items-center gap-8">
            <img className="px-10" key={index} src={logo}></img>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Colaboration;
