import React from "react";
import Banner from "./Banner";
import HowItWorks from "./HowItWorks";
import OurServices from "./OurServices";
import FeaturedList from "./FeaturedList";
import Colaboration from "./Colaboration";
const promiseData = fetch("/services.json").then((res) => res.json());
const Home = () => {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <OurServices promiseData={promiseData} />
      <Colaboration />
      <FeaturedList />
    </div>
  );
};

export default Home;
