import React from "react";
import { Image } from "react-bootstrap";

import FaceBook from "../assets/socialMedia/FaceBook.png";
import LinkedIn from "../assets/socialMedia/LinkedIn.png";
import Twitter from "../assets/socialMedia/Twitter.png";

const Footer = () => (
  <div style={{ background: "#FFF", bottom: 0, height: 59, width: "100%", position: "fixed" }}>
    <p style={{ textAlign: "center", paddingTop: 21 }}>
      <text style={{ fontWeight: "bold", color: "#000766", marginRight: 100 }}>
        © 2021 Proudly Created by Team 15 Connected
      </text>
      <Image style={{ marginRight: 35, width: 25, height: 25 }} src={FaceBook} alt="Face Book Logo" />
      <Image style={{ marginRight: 35, width: 25, height: 25 }} src={LinkedIn} alt="LinkedIn Logo" />
      <Image style={{ marginRight: 35, width: 25, height: 25 }} src={Twitter} alt="Twitter Logo" />
    </p>
  </div>
);

export default Footer;
