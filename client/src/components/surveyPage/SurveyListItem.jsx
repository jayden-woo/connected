/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SurveyListItem = ({ survey, isAdmin, updateSurvey }) => {
  const [width, setWidth] = useState(1000);
  const visible = survey.visible ? "" : "sli--invisible";

  const updateWindowWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  if (!isAdmin && !survey.visible) return <></>;

  return (
    <li className="sli-container">
      <Row>
        <Col>
          <NavLink className={`sli__title ${visible}`} to={`surveys/${survey._id}`}>
            {survey.title}
          </NavLink>
          <p className="sli__description">{survey.description}</p>
        </Col>
        {isAdmin && (
          <Col xs={12} sm={1}>
            <div className="sli__btn-container">
              {survey.visible && (
                <OverlayTrigger
                  key="hide survey"
                  placement={width <= 576 ? "top" : "left"}
                  overlay={<Tooltip id="tooltip-hide-survey">Hide Survey</Tooltip>}
                >
                  <Button className="shadow-none sli__btn" onClick={() => updateSurvey(survey._id, { visible: false })}>
                    <i className="fas fa-eye-slash" />
                  </Button>
                </OverlayTrigger>
              )}
              {!survey.visible && (
                <OverlayTrigger
                  key="unhide survey"
                  placement={width <= 576 ? "top" : "left"}
                  overlay={<Tooltip id="tooltip-unhide-survey">Unhide Survey</Tooltip>}
                >
                  <Button className="shadow-none sli__btn" onClick={() => updateSurvey(survey._id, { visible: true })}>
                    <i className="fas fa-eye" />
                  </Button>
                </OverlayTrigger>
              )}
            </div>
            <div className="sli__btn-container">
              <OverlayTrigger
                key="view submissions"
                placement={width <= 576 ? "top" : "left"}
                overlay={<Tooltip id="tooltip-view-submissions">View Submissions</Tooltip>}
              >
                <Button className="shadow-none sli__btn">
                  <NavLink to={`submissions/?survey=${survey._id}`}>
                    <i className="fas fa-stream" />
                  </NavLink>
                </Button>
              </OverlayTrigger>
            </div>
          </Col>
        )}
      </Row>
    </li>
  );
};

SurveyListItem.propTypes = {
  survey: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    thumbnail: PropTypes.string,
    updatedAt: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  updateSurvey: PropTypes.func.isRequired,
};

export default SurveyListItem;
