import React from "react";
import { FirstSectione } from "./sections/firstSection";
import { SecondSectione } from "./sections/secondSection";
import { ThirdSectione } from "./sections/thirdSection";
import { FourthSectione } from "./sections/forthSection";
import { FifthSectione } from "./sections/fifthSection";
import { SixthSectione } from "./sections/sixthSection";
import { Footer } from "../../components/footer";

export const HomePage = () => {
  return (
    <>
      <FirstSectione />
      <SecondSectione />
      <ThirdSectione />
      <FourthSectione />
      <FifthSectione />
      <SixthSectione />
      <Footer />
    </>
  );
};
