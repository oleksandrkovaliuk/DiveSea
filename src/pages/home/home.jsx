import React from "react";
import { FirstSection } from "./sections/firstSection";
import { SecondSection } from "./sections/secondSection";
import { ThirdSection } from "./sections/thirdSection";
import { FourthSection } from "./sections/forthSection/index.jsx";
import { FifthSection } from "./sections/fifthSection/fifthSection.jsx";
import { Footer } from "../../components/footer/footer.jsx";
import { SixthSection } from "./sections/sixthSection/sixthSection.jsx";
export const Home = () => {
  return (
    <>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixthSection />
      <Footer />
    </>
  );
};
