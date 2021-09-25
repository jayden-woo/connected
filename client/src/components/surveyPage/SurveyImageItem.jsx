/* eslint-disable no-underscore-dangle */
import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const SurveyListItem = ({ survey, isAdmin, updateSurvey }) => {
  const visible = survey.visible ? "" : "sii--invisible";

  if (!isAdmin && !survey.visible) return <div />;

  return (
    <Card className="sii-container">
      {survey.thumbnail && <Card.Img src={survey.thumbnail} alt="Survey Thumbnail" className="sii__thumbnail" />}
      {!survey.thumbnail && <div className="sii__thumbnail sii__thumbnail--placeholder" />}
      <Card.ImgOverlay style={{ padding: 0 }}>
        <div className="sii__background">
          <Row>
            <Col xs={12} sm={10}>
              <Card.Title className={`sii__title ${visible}`} as={NavLink} to={`surveys/${survey._id}`}>
                {survey.title}
              </Card.Title>
            </Col>
            {isAdmin && (
              <Col xs={6} sm={1}>
                {!survey.visible && (
                  <OverlayTrigger
                    key="unhide survey"
                    placement="left"
                    overlay={<Tooltip id="tooltip-unhide-survey">Unhide Survey</Tooltip>}
                  >
                    <Button
                      className="shadow-none sii__btn"
                      onClick={() => updateSurvey(survey._id, { visible: true })}
                    >
                      <i className="fas fa-eye" />
                    </Button>
                  </OverlayTrigger>
                )}
                {survey.visible && (
                  <OverlayTrigger
                    key="hide survey"
                    placement="left"
                    overlay={<Tooltip id="tooltip-hide-survey">Hide Survey</Tooltip>}
                  >
                    <Button
                      className="shadow-none sii__btn"
                      onClick={() => updateSurvey(survey._id, { visible: false })}
                    >
                      <i className="fas fa-eye-slash" />
                    </Button>
                  </OverlayTrigger>
                )}
              </Col>
            )}
            {isAdmin && (
              <Col xs={6} sm={1}>
                <OverlayTrigger
                  key="view submissions"
                  placement="right"
                  overlay={<Tooltip id="tooltip-view-submissions">View Submissions</Tooltip>}
                >
                  <Button className="shadow-none sii__btn" as={NavLink} to={`submissions/?survey=${survey._id}`}>
                    <i className="fas fa-stream" />
                  </Button>
                </OverlayTrigger>
              </Col>
            )}
          </Row>
          <Card.Text className="sii__description">{survey.description}</Card.Text>
        </div>
      </Card.ImgOverlay>
    </Card>
  );
};

SurveyListItem.propTypes = {
  survey: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    updatedAt: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  updateSurvey: PropTypes.func.isRequired,
};

export default SurveyListItem;
