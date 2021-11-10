import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

const Bool = ({ question, updateQuestion }) => {
  const [label, setLabel] = useState("");
  const [labelTrue, setLabelTrue] = useState("");
  const [labelFalse, setLabelFalse] = useState("");
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    setLabel(question.label);
    setLabelTrue(question.labelTrue);
    setLabelFalse(question.labelFalse);
    setShowTitle(question.showTitle);
  }, []);

  return (
    <Form>
      <Form.Group>
        <Form.Label>Question Label</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter question label here ..."
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={() => updateQuestion(question.name, "label", label)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Label True</Form.Label>
        <Form.Control
          type="text"
          value={labelTrue}
          onChange={(e) => setLabelTrue(e.target.value)}
          onBlur={() => updateQuestion(question.name, "labelTrue", labelTrue)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Label False</Form.Label>
        <Form.Control
          type="text"
          value={labelFalse}
          onChange={(e) => setLabelFalse(e.target.value)}
          onBlur={() => updateQuestion(question.name, "labelFalse", labelFalse)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Check
          type="checkbox"
          label="Show Title"
          onChange={() => {
            updateQuestion(question.name, "showTitle", !showTitle);
            setShowTitle(!showTitle);
          }}
        />
      </Form.Group>
    </Form>
  );
};

Bool.propTypes = {
  question: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    labelTrue: PropTypes.string.isRequired,
    labelFalse: PropTypes.string.isRequired,
    showTitle: PropTypes.bool.isRequired,
  }).isRequired,
  updateQuestion: PropTypes.func.isRequired,
};

export default Bool;
