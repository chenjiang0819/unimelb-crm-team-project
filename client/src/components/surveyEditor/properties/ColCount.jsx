import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

const ColCount = ({ question, updateQuestion }) => {
  const [colCount, setColCount] = useState(0);

  useEffect(() => {
    setColCount(question.colCount);
  }, []);

  return (
    <Form>
      <Form.Group>
        <Form.Label>Column Count</Form.Label>
        <Form.Control
          type="number"
          value={colCount}
          onChange={(e) => setColCount(parseInt(e.target.value, 10))}
          onBlur={() => updateQuestion(question.name, "colCount", colCount)}
        />
      </Form.Group>
    </Form>
  );
};

ColCount.propTypes = {
  question: PropTypes.shape({
    name: PropTypes.string.isRequired,
    colCount: PropTypes.number.isRequired,
  }).isRequired,
  updateQuestion: PropTypes.func.isRequired,
};

export default ColCount;
