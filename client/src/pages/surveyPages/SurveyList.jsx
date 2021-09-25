/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import _ from "lodash";
import { useAuth0 } from "@auth0/auth0-react";
import Masonry from "react-masonry-css";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import axios from "../../services/axios";
import SurveyListItem from "../../components/surveyPage/SurveyListItem";
import SurveyImageItem from "../../components/surveyPage/SurveyImageItem";
import notify from "../../services/notifyService";
import Loading from "../../components/Loading";

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [listView, setListView] = useState(false);
  const [loadingSurveys, setLoadingSurveys] = useState(true);

  const { getIdTokenClaims, isAuthenticated, isLoading } = useAuth0();

  useEffect(async () => {
    try {
      const res = await axios.get("/api/surveys");
      setSurveys(res.data);
      setLoadingSurveys(false);

      if (isLoading || !isAuthenticated) return;

      const claims = await getIdTokenClaims();
      setIsAdmin(claims["https://it-project-connected.herokuapp.com/roles"] === "admin");
    } catch (e) {
      notify.errorNotify(e.message);
    }
  }, [isAuthenticated, isLoading]);

  const updateSurvey = async (id, changes) => {
    const index = _.findIndex(surveys, { _id: id });
    const { data: survey } = await axios.put(`/api/surveys/${id}`, changes);
    const newSurveys = [...surveys];
    newSurveys[index] = survey;
    setSurveys(newSurveys);
  };

  if (isLoading || loadingSurveys) return <Loading />;

  const breakpointColumnsObj = {
    default: 2,
    768: 1,
  };

  return (
    <div className="sl-container">
      <div className="sl__content">
        <div className="sl__toggle-display">
          <OverlayTrigger
            key="toggle display layout"
            placement="left"
            overlay={<Tooltip id="tooltip-toggle-display-layout">Toggle Display Layout</Tooltip>}
          >
            <Button
              className="shadow-none sl__btn-toggle"
              onClick={(e) => {
                setListView(!listView);
                e.currentTarget.blur();
              }}
            >
              <i className="fas fa-exchange-alt" />
            </Button>
          </OverlayTrigger>
        </div>
        {!listView && (
          <Masonry breakpointCols={breakpointColumnsObj} className="sl-grid" columnClassName="sl-grid_column">
            {surveys.map((s) => (
              <SurveyImageItem key={s._id} survey={s} isAdmin={isAdmin} updateSurvey={updateSurvey} />
            ))}
          </Masonry>
        )}
        {listView && (
          <ul>
            {surveys.map((s) => (
              <SurveyListItem key={s._id} survey={s} isAdmin={isAdmin} updateSurvey={updateSurvey} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SurveyList;
