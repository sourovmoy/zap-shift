import React from "react";
import Banner from "./Banner";
import HowItWorks from "./HowItWorks";
import OurServices from "./OurServices";
import FeaturedList from "./FeaturedList";
import Colaboration from "./Colaboration";
import Container from "../../Components/Container/Container";
const promiseData = fetch("/services.json").then((res) => res.json());
const Home = () => {
  return (
    <div>
      <Banner />
      <Container>
        <HowItWorks />
        <OurServices promiseData={promiseData} />
        <Colaboration />
        <FeaturedList />
      </Container>
    </div>
  );
};

export default Home;
