import styled from "styled-components";
import { Nav, TabContainer, TabContent, TabPane } from "react-bootstrap";
import backgroundImg from "../../assets/mainHeader.png";
import QuestionBoard from "./QuestionBoard";
import SurveyBoard from "./SurveyBoard";

const Background = styled.div`
  background-color: var(--color-background);
  padding: 0 0 8vh;
`;

const StyledImage = styled.img`
  height: 300px;
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  object-position: left bottom;
`;

const StyledNavContainer = styled(Nav)`
  margin: -20px 8vw 0;
  padding: 0;
  width: 84vw;
  @media (min-width: 768px) {
    margin: -30px 12vw 0;
    width: 76vw;
  }
  @media (min-width: 1200px) {
    margin: -30px 20vw 0;
    width: 60vw;
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
`;

const SurveyNav = styled(StyledNav)`
  background-color: var(--color-accent);
`;

const StyledNavLink = styled(Nav.Link)`
  color: white;
  &:hover {
    color: white;
    filter: brightness(75%);
  }
`;

const Home = () => (
  <Background>
    <StyledImage src={backgroundImg} />
    <TabContainer id="homeTab" defaultActiveKey="questionBoard">
      <StyledNavContainer>
        <QuestionNav>
          <StyledNavLink eventKey="questionBoard">Question Board</StyledNavLink>
        </QuestionNav>
        <SurveyNav>
          <StyledNavLink eventKey="surveyBoard">Survey Board</StyledNavLink>
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
