import styled from "styled-components";
import { Nav, TabContainer, TabContent, TabPane } from "react-bootstrap";
import backgroundImg from "../../assets/mainHeader.png";
import QuestionBoard from "./QuestionBoard";
import SurveyBoard from "./SurveyBoard";

const Background = styled.div`
  background-color: var(--color-background);
  min-height: calc(100vh - var(--height-nav-bar) - var(--height-footer));
  margin-top: 80px;
  padding: 0 0 8vh;
`;

const StyledImage = styled.img`
  height: 350px;
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  object-position: left bottom;
  @media (max-width: 480px) {
    height: 250px;
  }
`;

const StyledNavContainer = styled(Nav)`
  // margin: -20px 8% 0;
  margin: -20px 0 0;
  padding: 0;
  // width: 84%;
  width: 100%;
  @media (min-width: 768px) {
    margin: -30px 12% 0;
    width: 76%;
  }
  @media (min-width: 1200px) {
    margin: -30px 20% 0;
    width: 60%;
  }
`;

const StyledNav = styled(Nav.Item)`
  font-size: 1.2rem;
  text-align: center;
  padding: 0.5rem;
  width: 50%;
  @media (min-width: 768px) {
    font-size: 1.5rem;
    padding: 1rem;
  }
`;

const QuestionNav = styled(StyledNav)`
  background-color: var(--color-primary);
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70px;
`;

const SurveyNav = styled(StyledNav)`
  background-color: var(--color-accent);
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledNavLink = styled(Nav.Link)`
  color: white;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: white;
    filter: brightness(75%);
    cursor: pointer;
  }
  &:focus {
    color: white;
  }
`;

const Home = () => (
  <Background>
    <StyledImage src={backgroundImg} />
    <TabContainer id="homeTab" defaultActiveKey="questionBoard">
      <StyledNavContainer>
        <QuestionNav>
          <StyledNavLink className="shadow-none" eventKey="questionBoard">
            Question Board
          </StyledNavLink>
        </QuestionNav>
        <SurveyNav>
          <StyledNavLink className="shadow-none" eventKey="surveyBoard">
            Survey Board
          </StyledNavLink>
        </SurveyNav>
      </StyledNavContainer>
      <TabContent>
        <TabPane eventKey="questionBoard">
          <QuestionBoard />
        </TabPane>
        <TabPane eventKey="surveyBoard">
          <SurveyBoard />
        </TabPane>
      </TabContent>
    </TabContainer>
  </Background>
);

export default Home;
