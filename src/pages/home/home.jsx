import React from "react";
import { FirstSection } from "./sections/firstSection";
import { SecondSection } from "./sections/secondSection";
import { ThirdSection } from "./sections/thirdSection";
import { FourthSection } from "./sections/forthSection/index.jsx";
import { FifthSection } from "./sections/fifthSection/fifthSection.jsx";
export const Home = () => {
  return (
    <>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
    </>
  );
};
