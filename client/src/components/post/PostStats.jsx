import { Col, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MediaQuery from "react-responsive";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  border: 1px solid var(--color-primary);
  border-radius: 0.75rem;
  margin: 1rem 10%;
  font-size: 1.1rem;
  max-width: 80%;
`;

const PostStats = ({ views, comments, solved }) => (
  <StyledContainer>
    <Row className="p-3 pt-4 align-items-center">
      <Col>
        <FontAwesomeIcon icon="eye" size="lg" color="var(--color-primary)" />
        &nbsp;{` ${views}`}
        <MediaQuery minWidth={768}>{` Views`}</MediaQuery>
      </Col>
    </Row>
    <Row className="p-3 align-items-center">
      <Col>
        <FontAwesomeIcon icon="comments" size="lg" color="var(--color-primary)" />
        &nbsp;{` ${comments}`}
        <MediaQuery minWidth={768}>{` Comments`}</MediaQuery>
      </Col>
    </Row>
    <Row className="p-3 pb-4 align-items-center">
      <Col>
        {solved ? (
          <>
            <FontAwesomeIcon icon="check-circle" size="lg" color="var(--bs-success)" />
            <MediaQuery minWidth={768}>&nbsp;{` Solved`}</MediaQuery>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon="times-circle" size="lg" color="var(--bs-danger)" />
            <MediaQuery minWidth={768}>&nbsp;{` Unsolved`}</MediaQuery>
          </>
        )}
      </Col>
    </Row>
  </StyledContainer>
);

PostStats.defaultProps = {
  views: 0,
  comments: 0,
  solved: false,
};

PostStats.propTypes = {
  views: PropTypes.number,
  comments: PropTypes.number,
  solved: PropTypes.bool,
};

export default PostStats;
