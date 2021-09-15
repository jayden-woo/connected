import { Col, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import moment from "moment";
import styled from "styled-components";

const LineBreak = styled.hr`
  border: 0;
  height: 1px;
  width: 90%;
  position: relative;
  margin: 20px auto;
  background: var(--color-primary);

  &:before {
    content: "";
    width: 6px;
    height: 6px;
    background: var(--color-primary);
    display: inline-block;
    border: 2px solid var(--color-primary);
    position: absolute;
    top: -2.5px;
    left: 50%;
    margin: 0 0 0 -3px;
    transform: rotate(45deg);
  }
`;

const PostContent = ({ user, createdAt, title, content }) => {
  const date = new Date(createdAt);

  return (
    <>
      <Container>
        <Row>
          <Col as="p" xs="8" className="ps-4 pe-2 pt-3">
            {user}
          </Col>
          <Col as="p" xs="4" className="pe-4 pt-3 text-end">
            {moment(date).fromNow()}
          </Col>
        </Row>
        {title !== "" && (
          <Row>
            <Col as="h2" className="px-4 py-1 lh-base">
              {title}
            </Col>
          </Row>
        )}
        <Row>
          <Col as="p" className="px-4 pt-2 lh-base">
            {content}
          </Col>
        </Row>
      </Container>
      <LineBreak />
    </>
  );
};

PostContent.defaultProps = {
  title: "",
};

PostContent.propTypes = {
  user: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string,
  content: PropTypes.string.isRequired,
};

export default PostContent;
