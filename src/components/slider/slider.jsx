import React, { useRef, useState } from "react";
import classNames from "classnames";
import Slider from "react-slick";
import s from "./slider.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Switcher } from "../leftRightSwitcher";
import { cardInfo } from "../card/cardInfo";

import "./custom-styles-slider.scss";

export const SliderComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const handleBeforeChange = (newIndex) => {
    setCurrentSlide(newIndex);
  };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: null,
    prevArrow: null,
    beforeChange: handleBeforeChange,
  };

  return (
    <div className={`${s.slider_container} custom-slider-container`}>
      <Slider ref={sliderRef} {...settings}>
        {cardInfo.map((item, index) => {
          const sliderClassNames = classNames(s.slides, "slides", {
            [s.activeSlide]: currentSlide === index,
          });
          return (
            <div className={s.slid_wrap} key={item.id}>
              <div className={sliderClassNames}>
                <img src={item.img} alt="img of slide" />
              </div>
            </div>
          );
        })}
      </Slider>
      <div className={s.switcher_wrap}>
        <Switcher prev={previous} next={next} />
      </div>
    </div>
  );
};
