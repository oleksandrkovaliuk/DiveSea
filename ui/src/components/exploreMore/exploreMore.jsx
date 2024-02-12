import React from "react";
import e from "./exploreMore.module.scss";
import { ArrowRight } from "../../icons/arrowRight";
import { useNavigate } from "react-router-dom";

export const ExploreMore = ({ directTo }) => {
  const navigation = useNavigate();

  const navigateTo = (link) => navigation(link);
  return (
    <button onClick={() => navigateTo(directTo)} className={e.exploreMore}>
      Explore All <ArrowRight />
    </button>
  );
};
