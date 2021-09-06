import PropTypes from "prop-types";
import { Card, Col, Container, Row } from "react-bootstrap";
import MediaQuery from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledCard = styled(Card)`
  border: 1px solid var(--color-primary);
  border-radius: 0.75rem;
  margin: 40px 5vw;
`;

const StyledLink = styled(Link)`
  color: var(--color-text);
  &:hover {
    color: var(--color-text);
  }
`;

const PostSummary = ({ postId, title, body, createdAt, views, comments, solved, following }) => {
  const date = new Date(createdAt);

  return (
    <StyledCard>
      <Container fluid="lg">
        <Row className="align-items-center">
          <Col>
            <StyledLink to={`/posts/${postId}`}>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{body.length < 150 ? body : body.substring(0, 150).concat("...")}</Card.Text>
                <Card.Text>
                  <small className="text-muted">Posted on {date.toUTCString()}</small>
                </Card.Text>
                <Card.Text as="div">
                  <Row className="align-items-center">
                    <Col xs={4} sm={5} lg={3}>
                      <FontAwesomeIcon icon="eye" size="lg" color="var(--color-primary)" />
                      {` ${views}`}
                      <MediaQuery minWidth={768}>{` Views`}</MediaQuery>
                    </Col>
                    <Col xs={4} sm={5} lg={3}>
                      <FontAwesomeIcon icon="comments" size="lg" color="var(--color-primary)" />
                      {` ${comments}`}
                      <MediaQuery minWidth={768}>{` Comments`}</MediaQuery>
                    </Col>
                    <Col xs={2} sm={1} lg={3}>
                      {solved ? (
                        <>
                          <FontAwesomeIcon icon="check-circle" size="lg" color="var(--bs-success)" />
                          <MediaQuery minWidth={1024}>{` Solved`}</MediaQuery>
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon="times-circle" size="lg" color="var(--bs-danger)" />
                          <MediaQuery minWidth={1024}>{` Unsolved`}</MediaQuery>
                        </>
                      )}
                    </Col>
                    <Col xs={2} sm={1} lg={3}>
                      {following ? (
                        <>
                          <FontAwesomeIcon icon="bell" size="lg" color="var(--color-primary)" />
                          <MediaQuery minWidth={1024}>{` Following`}</MediaQuery>
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon="bell-slash" size="lg" color="var(--color-primary)" />
                          <MediaQuery minWidth={1024}>{` Unfollowed`}</MediaQuery>
                        </>
                      )}
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </StyledLink>
          </Col>
          <Col xs={1}>
            <FontAwesomeIcon icon="ellipsis-v" size="lg" color="var(--color-primary)" />
          </Col>
        </Row>
      </Container>
    </StyledCard>
  );
};

PostSummary.defaultProps = {
  views: 0,
  comments: 0,
  solved: false,
  following: false,
};

PostSummary.propTypes = {
  postId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  views: PropTypes.number,
  comments: PropTypes.number,
  solved: PropTypes.bool,
  following: PropTypes.bool,
};

export default PostSummary;