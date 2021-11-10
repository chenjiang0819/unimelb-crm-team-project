import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

const Rating = ({ question, updateQuestion }) => {
  const [rateMin, setRateMin] = useState(0);
  const [rateMax, setRateMax] = useState(0);
  const [rateStep, setRateStep] = useState(0);
  const [minRateDescription, setMinRateDescription] = useState("");
  const [maxRateDescription, setMaxRateDescription] = useState("");

  useEffect(() => {
    setRateMin(question.rateMin);
    setRateMax(question.rateMax);
    setRateStep(question.rateStep);
    setMinRateDescription(question.minRateDescription);
    setMaxRateDescription(question.maxRateDescription);
  }, []);

  return (
    <Form>
      <Form.Group>
        <Form.Label>Rate Min</Form.Label>
        <Form.Control
          type="number"
          value={rateMin}
          onChange={(e) => setRateMin(parseInt(e.target.value, 10))}
          onBlur={() => updateQuestion(question.name, "rateMin", rateMin)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Rate Max</Form.Label>
        <Form.Control
          type="number"
          value={rateMax}
          onChange={(e) => setRateMax(parseInt(e.target.value, 10))}
          onBlur={() => updateQuestion(question.name, "rateMax", rateMax)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Rate Step</Form.Label>
        <Form.Control
          type="number"
          value={rateStep}
          onChange={(e) => setRateStep(parseInt(e.target.value, 10))}
          onBlur={() => updateQuestion(question.name, "rateStep", rateStep)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Min Rate Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter min rate description here ..."
          value={minRateDescription}
          onChange={(e) => setMinRateDescription(e.target.value)}
          onBlur={() => updateQuestion(question.name, "minRateDescription", minRateDescription)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Max Rate Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter max rate description here ..."
          value={maxRateDescription}
          onChange={(e) => setMaxRateDescription(e.target.value)}
          onBlur={() => updateQuestion(question.name, "maxRateDescription", maxRateDescription)}
        />
      </Form.Group>
    </Form>
  );
};

Rating.propTypes = {
  question: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rateMin: PropTypes.number.isRequired,
    rateMax: PropTypes.number.isRequired,
    rateStep: PropTypes.number.isRequired,
    minRateDescription: PropTypes.string.isRequired,
    maxRateDescription: PropTypes.string.isRequired,
  }).isRequired,
  updateQuestion: PropTypes.func.isRequired,
};

export default Rating;
