/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Masonry from "react-masonry-css";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import styled from "styled-components";
import axios from "../../helpers/axios";
import SurveyListItem from "../../components/surveyPage/SurveyListItem";
import SurveyImageItem from "../../components/surveyPage/SurveyImageItem";
import notify from "../../helpers/notifyService";
import Loading from "../../components/Loading";
import backgroundImg from "../../assets/surveyHeader.JPG";

const audience =
  process.env.NODE_ENV === "production" ? "http://localhost:3000/" : "localhost:3000/api/";

const StyledImage = styled.img`
  height: 350px;
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  object-position: middle;
  @media (max-width: 480px) {
    height: 250px;
  }
`;

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [listView, setListView] = useState(false);
  const [loadingSurveys, setLoadingSurveys] = useState(true);

  const { getAccessTokenSilently, getIdTokenClaims, isAuthenticated, isLoading } = useAuth0();

  useEffect(async () => {
    try {
      const res = await axios.get("/api/surveys");
      setSurveys(res.data);
      setLoadingSurveys(false);

      if (isLoading || !isAuthenticated) return;

      const claims = await getIdTokenClaims();
      setIsAdmin(claims["http://localhost:3000/"][0] === "Admin");
    } catch (e) {
      notify.errorNotify(e.message);
    }
  }, [isAuthenticated, isLoading]);

  const updateSurvey = async (id, changes) => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience,
        scope: "edit:survey",
      });
      const index = _.findIndex(surveys, { _id: id });
      const { data: survey } = await axios.put(`/api/surveys/${id}`, changes, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const newSurveys = [...surveys];
      newSurveys[index] = survey;
      setSurveys(newSurveys);
    } catch (e) {
      notify.errorNotify(e.message);
    }
  };

  if (isLoading || loadingSurveys) return <Loading />;

  const breakpointColumnsObj = {
    default: 4,
    2400: 3,
    1600: 2,
    800: 1,
  };

  return (
    <div className="sl-container">
      <div className="sl__content" style={{ paddingTop: 0 }}>
        {/* <div className="sl__bg-image" /> */}
        <StyledImage className="sl__bg-image" src={backgroundImg} />
        <div className="sl__header-section">
          <h1 className="sl__title">Do Our Surveys Here</h1>
          <NavLink className="sl__new-survey" to="create-survey">
            Create a new survey
          </NavLink>
        </div>
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
          <ul style={{ padding: "0" }}>
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
