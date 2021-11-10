import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import PropTypes from "prop-types";
import qs from "query-string";
import axios from "../../helpers/axios";
import notify from "../../helpers/notifyService";
import Pair from "../../components/submissions/Pair";
import Loading from "../../components/Loading";

const audience =
  process.env.NODE_ENV === "production" ? "http://localhost:3000/" : "localhost:3000/api/";

const Submissions = ({ location }) => {
  const [loadingResponses, setLoadingResponses] = useState(true);
  const [survey, setSurvey] = useState({});
  const [qrPair, setQrPair] = useState({});

  const history = useHistory();

  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const query = qs.parse(location.search);

  useEffect(async () => {
    if (isLoading || !isAuthenticated) return;

    try {
      const accessToken = await getAccessTokenSilently({
        audience,
        scope: "read:submission",
      });

      const { data: surveyData } = await axios.get(`/api/surveys/${query.survey}`);
      const { data: submissionsData } = await axios.get(`/api/submissions/?survey=${query.survey}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

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
      setLoadingResponses(false);
    } catch (e) {
      // TODO: redirect to not found page
      if (e.response && e.response.status === 404) {
        history.push("/404");
      } else if (e.response && e.response.status === 403) {
        history.push("/403");
      } else {
        notify.errorNotify(e.message);
      }
    }
  }, [isAuthenticated, isLoading]);

  if (loadingResponses) return <Loading />;

  return (
    <div className="sb-container">
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
    </div>
  );
};

Submissions.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default Submissions;
