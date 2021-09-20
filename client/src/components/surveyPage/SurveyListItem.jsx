/* eslint-disable no-underscore-dangle */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";

const SurveyListItem = ({ survey, isAdmin, updateSurvey }) => {
  const className = survey.visible ? "" : "sl--invisible";

  return (
    <div>
      {(isAdmin || survey.visible) && (
        <li className={className}>
          <Row>
            <Col>
              <Link to={`/surveys/${survey._id}`}>
                <p>{survey.title}</p>
              </Link>
            </Col>
            <Col xs={1}>
              {isAdmin && (
                <Dropdown align="end">
                  <Dropdown.Toggle className="shadow-none">
                    <div className="sl__more-icon" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href={`submissions/?survey=${survey._id}`}>View submissions</Dropdown.Item>
                    {survey.visible && (
                      <Dropdown.Item onClick={() => updateSurvey(survey._id, { visible: false })}>
                        Hide this survey
                      </Dropdown.Item>
                    )}
                    {!survey.visible && (
                      <Dropdown.Item onClick={() => updateSurvey(survey._id, { visible: true })}>
                        Unhide this survey
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Col>
          </Row>
        </li>
      )}
    </div>
  );
};

SurveyListItem.propTypes = {
  survey: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    updatedAt: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  updateSurvey: PropTypes.func.isRequired,
};

export default SurveyListItem;
