import React from "react";
import Header from "../components/Layout/Header";
import Steps from "../components/home/Steps";
import BgSlider from "../components/home/BgSlider";
import Upload from "../components/home/Upload";

const Home = () => {
  return (
    <div>
      <Header />
      <Steps />
      <BgSlider />
      <Upload />
    </div>
  );
};

export default Home;
