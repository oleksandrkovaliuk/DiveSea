import React from "react";
import p from "./plus.module.scss"
import classNames from "classnames";
export const Plus = ({setActive}) => {
const classes = classNames(p.svg , {
  [p.setActive]: setActive
})
  return (
    <div className={classes}>
     <svg 
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="34"
        viewBox="0 0 33 34"
        fill="none"
      >
        <circle
          cx="16.3913"
          cy="16.746"
          r="15.7108"
          fill="#141416"
          stroke="#141416"
          strokeWidth="1.20853"
        />
        {/* <rect
          x="10.3486"
          y="16.7461"
          width="11.481"
          height="1.20853"
          fill="white"
        />
        <rect className={p.middle}
          x="15.4854"
          y="23.0906"
          width="11.481"
          height="1.20853"
          transform="rotate(-90 15.4854 23.0906)"
          fill="white"
        /> */}
      </svg>
    </div>
  );
};
