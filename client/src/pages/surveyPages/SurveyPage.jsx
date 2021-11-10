import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Survey from "survey-react";
import PropTypes from "prop-types";
import Spinner from "react-bootstrap/Spinner";
import axios from "../../helpers/axios";

Survey.StylesManager.applyTheme("modern");

const SurveyPage = ({ match }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [survey, setSurvey] = useState({});

  const history = useHistory();

  useEffect(async () => {
    try {
      const res = await axios.get(`/api/surveys/${match.params.id}`);
      setIsLoading(false);
      setSurvey(res.data);
    } catch (e) {
      // TODO: redirect to not found page
      if (e.response.status === 404) {
        history.push("/404");
      }
    }
  }, []);

  const handleComplete = async (sender) => {
    const submission = {
      survey: match.params.id,
      responses: [],
    };

    survey.questions.forEach((q) => {
      if (q.type !== "image" && q.type !== "html" && sender.data[q.name] !== undefined) {
        submission.responses.push({ name: q.name, response: sender.data[q.name] });
      }
    }, survey.questions);

    try {
      await axios.post("/api/submissions", submission);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  return (
    <div className="sp-container">
      <div className="sp__survey">
        {isLoading && (
          <div className="text-center">
            <Spinner animation="border" role="status" className="loading">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {!isLoading && <Survey.Survey json={survey} onComplete={handleComplete} />}
      </div>
    </div>
  );
};

SurveyPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default SurveyPage;
