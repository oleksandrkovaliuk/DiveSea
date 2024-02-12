import React from "react";
import f from "./footer.module.scss";
import { Logo } from "../../icons/Logo";
import { Instagram } from "../../icons/instagram";
import { Linked } from "../../icons/linkeid";
import { Facebook } from "../../icons/facebook";
import { Twitter } from "../../icons/twitter";

export const Footer = () => {
  return (
    <div className={f.footer_container}>
      <div className={f.footerTop_section}>
        <div className={f.logo}>
          <Logo/>
          <span className={f.logo_text}>DiveSea</span>
        </div>
        <ul className={f.footer_nav}>
          <li className={f.footer_nav_list}>Privacy Policy</li>
          <li className={f.footer_nav_list}>Term & Conditions</li>
          <li className={f.footer_nav_list}>About Us</li>
          <li className={f.footer_nav_list}>Contact</li>
        </ul>
      </div>
      <div className={f.footerBottom_section}>
        <span className={f.company}>© 2023 EATLY All Rights Reserved.</span>
        <ul className={f.social_nav}>
            <li className={f.social_nav_list}>
                <Instagram />
            </li>
            <li className={f.social_nav_list}>
                <Linked />
            </li>
            <li className={f.social_nav_list}>
                <Facebook />
            </li>
            <li className={f.social_nav_list}>
                <Twitter />
            </li>
        </ul>
      </div>
    </div>
  );
};
