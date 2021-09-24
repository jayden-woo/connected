/* eslint-disable no-underscore-dangle */
import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";

const SurveyListItem = ({ survey, isAdmin }) => {
  // const SurveyListItem = ({ survey, isAdmin, updateSurvey }) => {
  const visible = survey.visible ? "" : "sli--invisible";

  if (!isAdmin && !survey.visible) return <div />;

  return (
    // <div>
    //   <li className={className}>
    //     <Row>
    //       <Col>
    //         <NavLink to={`/surveys/${survey._id}`}>
    //           <p>{survey.title}</p>
    //         </NavLink>
    //       </Col>
    //       <Col xs={1}>
    //         {isAdmin && (
    //           <Dropdown align="end">
    //             <Dropdown.Toggle className="shadow-none">
    //               <div className="sl__more-icon" />
    //             </Dropdown.Toggle>
    //             <Dropdown.Menu>
    //               <Dropdown.Item as={NavLink} to={`submissions/?survey=${survey._id}`}>
    //                 View submissions
    //               </Dropdown.Item>
    //               {survey.visible && (
    //                 <Dropdown.Item onClick={() => updateSurvey(survey._id, { visible: false })}>
    //                   Hide this survey
    //                 </Dropdown.Item>
    //               )}
    //               {!survey.visible && (
    //                 <Dropdown.Item onClick={() => updateSurvey(survey._id, { visible: true })}>
    //                   Unhide this survey
    //                 </Dropdown.Item>
    //               )}
    //             </Dropdown.Menu>
    //           </Dropdown>
    //         )}
    //       </Col>
    //     </Row>
    //   </li>
    // </div>
    <Card className="sli-container">
      {survey.thumbnail && <Card.Img src={survey.thumbnail} alt="Survey Thumbnail" className="sli__thumbnail" />}
      {!survey.thumbnail && <div className="sli__thumbnail sli__thumbnail--placeholder" />}
      <Card.ImgOverlay style={{ padding: 0 }}>
        <div className="sli__background">
          <Card.Title className={`sli__title ${visible}`} as={NavLink} to={`surveys/${survey._id}`}>
            {/* <Card.Title className={`sli__title ${visible}`} as={NavLink} to={`submissions/?survey=${survey._id}`}> */}
            {survey.title}
          </Card.Title>
          <Card.Text className="sli__description">{survey.description}</Card.Text>
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
  // updateSurvey: PropTypes.func.isRequired,
};

export default SurveyListItem;
