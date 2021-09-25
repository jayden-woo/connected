import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import FaceBook from "../assets/socialMedia/FaceBook.png";
import LinkedIn from "../assets/socialMedia/LinkedIn.png";
import Twitter from "../assets/socialMedia/Twitter.png";

const StyledImage = styled.img`
  width: 20px;
  height: 20px;
  margin: 20px 10px 20px 10px;
`;

const StyledP = styled.p`
  height: 60px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1rem;
  color: #190e89;
  position: absolute;
  @media (max-width: 480px) {
    font-size: 0.7rem;
    margin: 0 0 0 0;
  }
`;

const Footer = () => (
  <Container className="card-text" style={{ background: "#FFF", bottom: 0, height: "60px", width: "100%" }} fluid>
    <StyledP style={{ height: "60px", width: "100vw", marginBottom: 0 }}>
      © 2021 Proudly Created by Team 15 Connected &ensp;
      <StyledImage src={FaceBook} alt="Face Book Logo" />
      <StyledImage src={LinkedIn} alt="LinkedIn Logo" />
      <StyledImage src={Twitter} alt="Twitter Logo" />
    </StyledP>
  </Container>
);

export default Footer;
