import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

const Background = styled.div`
  background-color: var(--color-background);
  margin: 5rem 0 0;
  padding: 8vh 0 8vh;
`;

const StyledDiv = styled.div`
  margin: 0 8vw;
  padding: 30px 2rem 30px;
  border: 1px solid var(--color-primary);
  background-color: white;
  max-width: 100vw;
  @media (min-width: 768px) {
    margin: 0 12vw;
  }
  @media (min-width: 1200px) {
    margin: 0 20vw;
  }
`;

const Error = () => (
  <Background>
    <StyledDiv>
      <Container>
        <Row className="align-items-center text-center">
          <Col>
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <p>Sorry, an error has occured and the requested page is not found!</p>
            <p>
              Click <a href="/">here</a> to return to the homepage instead.
            </p>
          </Col>
        </Row>
      </Container>
    </StyledDiv>
  </Background>
);

export default Error;
