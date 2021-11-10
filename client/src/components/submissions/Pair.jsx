import React from "react";
import * as Survey from "survey-react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";

import Chart from "./Chart";
import List from "./List";

const Pair = ({ question, responses }) => {
  const survey = {
    questions: [{ ...question }],
  };

  return (
    <Row className="sb__pair">
      <Col sm={12} md={6}>
        <Survey.Survey json={survey} showQuestionNumbers="off" focusFirstQuestionAutomatic={false} />
      </Col>
      <Col sm={12} md={6}>
        {responses.length !== 0 &&
          ["boolean", "dropdown", "radiogroup", "rating", "checkbox", "ranking"].includes(question.type) && (
            <Chart responses={responses} isRanking={question.type === "ranking"} />
          )}
        {responses.length !== 0 && ["text", "comment"].includes(question.type) && <List responses={responses} />}
        {responses.length === 0 && (
          <div className="sb__empty">
            <p>No responses yet.</p>
          </div>
        )}
      </Col>
    </Row>
  );
};

Pair.propTypes = {
  question: PropTypes.shape().isRequired,
  responses: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number, PropTypes.arrayOf(PropTypes.string)])
  ).isRequired,
};

export default Pair;
