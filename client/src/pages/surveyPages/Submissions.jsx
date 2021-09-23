import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import PropTypes from "prop-types";
import qs from "query-string";
import axios from "../../services/axios";
import notify from "../../services/notifyService";
import Pair from "../../components/submissions/Pair";

const Submissions = ({ location }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [survey, setSurvey] = useState({});
  const [qrPair, setQrPair] = useState({});
  const query = qs.parse(location.search);
  const history = useHistory();

  useEffect(async () => {
    try {
      const { data: surveyData } = await axios.get(`/api/surveys/${query.survey}`);
      const { data: submissionsData } = await axios.get(`/api/submissions/?survey=${query.survey}`);

      const pairs = {};

      surveyData.questions.forEach((q) => {
        pairs[q.name] = [];
      });

      submissionsData.forEach((s) => {
        s.responses.forEach((r) => {
          if (!pairs[r.name]) {
            notify.errorNotify("Response does not have a matching question!");
            history.push("/");
          }
          pairs[r.name].push(r.response);
        });
      });

      setSurvey(surveyData);
      setQrPair(pairs);
      setIsLoading(false);
    } catch (e) {
      // TODO: redirect to not found page
      if (e.response && e.response.status === 404) {
        history.push("/");
      } else {
        notify.errorNotify(e.message);
      }
    }
  }, []);

  return (
    <div className="sb-container">
      {!isLoading && (
        <div className="sb__content">
          <h3 className="sb__title">{survey.title}</h3>
          <h5 className="sb__desc">{survey.description}</h5>
          {Object.keys(qrPair).map((question) => (
            <Pair
              key={question}
              question={survey.questions.filter((q) => q.name === question)[0]}
              responses={qrPair[question]}
            />
          ))}
        </div>
      )}
      {isLoading && (
        <div className="text-center">
          <Spinner animation="border" role="status" className="loading">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
};

Submissions.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default Submissions;
