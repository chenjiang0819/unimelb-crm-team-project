import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

const PlaceHolder = ({ question, updateQuestion }) => {
  const [placeHolder, setPlaceHolder] = useState("");

  useEffect(() => {
    setPlaceHolder(question.placeHolder);
  }, []);

  return (
    <Form>
      <Form.Group>
        <Form.Label>placeholder</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter placeholder here ..."
          value={placeHolder}
          onChange={(e) => setPlaceHolder(e.target.value)}
          onBlur={() => updateQuestion(question.name, "placeHolder", placeHolder)}
        />
      </Form.Group>
    </Form>
  );
};

PlaceHolder.propTypes = {
  question: PropTypes.shape({
    name: PropTypes.string.isRequired,
    placeHolder: PropTypes.string.isRequired,
  }).isRequired,
  updateQuestion: PropTypes.func.isRequired,
};

export default PlaceHolder;
