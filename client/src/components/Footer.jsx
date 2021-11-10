import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import FaceBook from "../assets/socialMedia/FaceBook.png";
import LinkedIn from "../assets/socialMedia/LinkedIn.png";
import Twitter from "../assets/socialMedia/Twitter.png";

const StyledImage = styled.img`
  width: 20px;
  height: 20px;
  margin: 20px 10px 20px 10px;
  cursor: pointer;
  @media (max-width: 576px) {
    justify-content: center;
    width: 15px;
    height: 15px;
    margin: 7.5px 7.5px 7.5px 7.5px;
  }
`;

const StyledP = styled.p`
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  justify-content: right;
  align-items: center;
  margin-bottom: 0px;
  color: #190e89;
  @media (max-width: 576px) {
    height: 30px;
    font-size: 0.9rem;
    align-items: flex-end;
    justify-content: center;
    margin: 0px 5px 0px 5px;
  }
`;

const Footer = () => (
  <Container style={{ background: "#FFF", bottom: 0, alignItems: "center", height: "60px" }} fluid>
    <Row sm="auto" className="justify-content-sm-center" style={{ alignItems: "center" }}>
      <Col md="auto">
        <StyledP>© 2021 Proudly Created by Team 15 Connected</StyledP>
      </Col>
      <Col md="auto" className="footer-icon">
        <StyledImage src={FaceBook} alt="Face Book Logo" />
        <StyledImage src={LinkedIn} alt="LinkedIn Logo" />
        <StyledImage src={Twitter} alt="Twitter Logo" />
      </Col>
    </Row>
  </Container>
);

export default Footer;
