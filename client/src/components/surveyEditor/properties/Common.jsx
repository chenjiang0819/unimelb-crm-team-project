import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

const Common = ({ question, updateQuestion }) => {
  const [title, setTitle] = useState("");
  const [isRequired, setIsRequired] = useState(false);

  useEffect(() => {
    if (question.title === "Question Preview" || question.title === "") return;
    setTitle(question.title);
  }, []);

  return (
    <Form>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter question title here ..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => updateQuestion(question.name, "title", title)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Check
          type="checkbox"
          label="Is Required ?"
          onChange={() => {
            updateQuestion(question.name, "isRequired", !isRequired);
            setIsRequired(!isRequired);
          }}
        />
      </Form.Group>
    </Form>
  );
};

Common.propTypes = {
  question: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  updateQuestion: PropTypes.func.isRequired,
};

export default Common;
