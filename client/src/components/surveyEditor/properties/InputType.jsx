import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

const InputType = ({ question, updateQuestion }) => {
  const [type, setType] = useState("");

  useEffect(() => {
    setType(question.inputType);
  }, []);

  return (
    <Form>
      <Form.Group>
        <Form.Label>Input Type</Form.Label>
        <Form.Select
          className="shadow-none"
          onChange={(e) => {
            updateQuestion(question.name, "inputType", e.target.value);
            setType(e.target.value);
          }}
          value={type}
        >
          <option>text</option>
          <option>email</option>
          <option>time</option>
          <option>date</option>
          <option>datetime</option>
          <option>week</option>
          <option>month</option>
          <option>password</option>
          <option>number</option>
          <option>tel</option>
          <option>range</option>
          <option>color</option>
          <option>url</option>
        </Form.Select>
      </Form.Group>
    </Form>
  );
};

InputType.propTypes = {
  question: PropTypes.shape({
    name: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
  }).isRequired,
  updateQuestion: PropTypes.func.isRequired,
};

export default InputType;
