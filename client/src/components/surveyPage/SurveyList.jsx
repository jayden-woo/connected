/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import _ from "lodash";
import http from "../../services/httpService";
import SurveyListItem from "./SurveyListItem";
import notify from "../../services/notifyService";

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(async () => {
    try {
      const res = await http.get("http://localhost:3000/api/surveys");
      setSurveys(res.data);
    } catch (e) {
      notify.errorNotify(e.message);
    }
  }, []);

  const updateSurvey = async (id, changes) => {
    const index = _.findIndex(surveys, { _id: id });
    const { data } = await http.put(`http://localhost:3000/api/surveys/${id}`, changes);
    const survey = _.pick(data, ["_id", "title", "thumbnail", "updatedAt", "visible"]);
    const newSurveys = [...surveys];
    newSurveys[index] = survey;
    setSurveys(newSurveys);
  };

  return (
    <div className="sl-container">
      <div className="sl__content">
        <Button onClick={() => setIsAdmin(!isAdmin)}>Toggle Is Admin</Button>
        <ul>
          {surveys.map((s) => (
            // eslint-disable-next-line no-underscore-dangle
            <SurveyListItem key={s.updatedAt} survey={s} isAdmin={isAdmin} updateSurvey={updateSurvey} />
          ))}
        </ul>
      </div>
    </div>
  );
};

// SurveyList.propTypes = {
//     match: PropTypes.shape({
//       params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
//     }).isRequired,
//   };

export default SurveyList;
