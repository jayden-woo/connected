import { Container, Row, Col, Form, Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import MediaQuery from "react-responsive";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledDiv = styled.div`
  background-color: var(--color-background);
  margin: 1rem 5vw;
  border: 1px solid var(--color-primary);
  border-radius: 8px;
`;

const StyledButton = styled(Button)`
  padding: 0.5rem 1.5rem;
  background-color: var(--color-primary);
  border-radius: 8px;
  &:hover {
    background-color: var(--color-primary);
    filter: brightness(75%);
  }
`;

const FilterMenu = ({ isAuthenticated, handleFilterSubmit }) => (
  <StyledDiv id="filterMenu">
    <Container fluid="sm">
      <Form onSubmit={handleFilterSubmit}>
        <Row>
          <Col className="px-3 py-1" xs={6} sm={5} lg={4}>
            <Form.Group>
              <Form.Label column>Filter By</Form.Label>
              <FloatingLabel className="pb-2" controlId="filterSolved" label="Solved">
                <Form.Select id="filterSolvedOption" aria-label="Solved filter option">
                  <option value="none">None</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel className="pb-2" controlId="filterFollowing" label="Following">
                <Form.Select id="filterFollowingOption" aria-label="Following filter option">
                  <option value="none">None</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel controlId="filterMine" label="Mine" hidden={!isAuthenticated}>
                <Form.Select id="filterMineOption" aria-label="Mine filter option">
                  <option value="none">None</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <MediaQuery minWidth={768}>
            <Col xs={1} />
          </MediaQuery>
          <Col className="px-3 py-1" xs={6} sm={5} lg={4}>
            <Form.Group id="filterSortOption">
              <Form.Label as="legend" column>
                Sort By
              </Form.Label>
              <Form.Check
                className="pb-1"
                type="radio"
                label="Newest"
                name="filterSortRadios"
                id="newest"
                value="newest"
                defaultChecked
              />
              <Form.Check
                className="pb-1"
                type="radio"
                label="Alphabetical"
                name="filterSortRadios"
                id="alphabetical"
                value="alphabetical"
              />
              <Form.Check
                className="pb-1"
                type="radio"
                label="Most Views"
                name="filterSortRadios"
                id="views"
                value="views"
              />
              <Form.Check
                className="pb-1"
                type="radio"
                label="Most Comments"
                name="filterSortRadios"
                id="comments"
                value="comments"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="my-3">
          <Col className="px-2 pb-1" xs={8}>
            <StyledButton type="submit">Apply Filter</StyledButton>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  </StyledDiv>
);

FilterMenu.defaultProps = {
  isAuthenticated: false,
};

FilterMenu.propTypes = {
  isAuthenticated: PropTypes.bool,
  handleFilterSubmit: PropTypes.func.isRequired,
};

export default FilterMenu;
