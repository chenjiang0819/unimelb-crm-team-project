import React from "react";
import styled from "styled-components";
import { Container, Row } from "react-bootstrap";
import headerImage from "../assets/aboutHeader.png";

const Background = styled.div`
  min-height: calc(100vh - var(--height-nav-bar) - var(--height-footer));
  margin-top: var(--height-nav-bar);
  padding: 0 0 8vh;
`;

const StyledImage = styled.img`
  height: 350px;
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  object-position: top;
  @media (max-width: 480px) {
    height: 250px;
    object-position: top left;
  }
`;

const StyledH2 = styled.h2`
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #000766;
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const StyledH4 = styled.h4`
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  color: #000766;
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const About = () => (
  <Background>
    <StyledImage className="center-headerImage" src={headerImage} alt="about header Image" />
    <Container>
      <Row>
        <StyledH2 style={{ textAlign: "center", marginTop: 45, marginBottom: 35, color: "#000766" }}>ABOUT US</StyledH2>
      </Row>
      <Row>
        <StyledH4>
          Connected Customer relationship management (CRM) is a technology for managing all your company’s relationships
          and interactions with customers and potential customers. The goal is simple: Improve business relationships.
          Our system helps companies stay connected to customers, streamline processes, and improve profitability.
          <br />
          <br />
          When people talk about CRM, they are usually referring to a CRM system, a tool that helps with contact
          management, sales management, productivity, and more.
          <br />
          <br />
          Our solution helps you focus on your organisation’s relationships with individual people — including
          customers, service users, colleagues, or suppliers — throughout your lifecycle with them, including finding
          new customers, winning their business, and providing support and additional services throughout the
          relationship.
          <br />
        </StyledH4>
      </Row>
    </Container>
  </Background>
);

export default About;
