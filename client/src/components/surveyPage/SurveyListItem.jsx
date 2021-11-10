/* eslint-disable no-underscore-dangle */
import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Row from "react-bootstrap/Row";

const SurveyListItem = ({ survey, isAdmin, updateSurvey }) => {
  const visible = survey.visible ? "" : "sli--invisible";

  if (!isAdmin && !survey.visible) return <></>;

  return (
    <li className="sli-container">
      <Row style={{ width: "100%", margin: "0" }}>
        <div className="sli__content">
          <NavLink className={`sli__title ${visible}`} to={`surveys/${survey._id}`}>
            {survey.title}
          </NavLink>
          <p className="sli__description">{survey.description}</p>
        </div>
        {isAdmin && (
          <div className="sli__btns">
            <div className="sli__btn-container">
              {survey.visible && (
                <OverlayTrigger
                  key="hide survey"
                  placement="left"
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
                  placement="left"
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
                placement="left"
                overlay={<Tooltip id="tooltip-view-submissions">View Submissions</Tooltip>}
              >
                <Button className="shadow-none sli__btn">
                  <NavLink to={`submissions/?survey=${survey._id}`}>
                    <i className="fas fa-stream" />
                  </NavLink>
                </Button>
              </OverlayTrigger>
            </div>
          </div>
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
