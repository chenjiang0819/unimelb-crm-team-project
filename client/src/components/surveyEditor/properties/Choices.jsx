import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

const Choices = ({ question, updateQuestion }) => {
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    setChoices(question.choices);
  }, []);

  const handleAddChoice = () => {
    const newChoices = [...question.choices];
    newChoices.push({
      id: uuidv4(),
      value: "",
    });
    updateQuestion(question.name, "choices", newChoices);
    setChoices(question.choices);
  };

  const handleRemoveChoice = () => {
    const newChoices = [...question.choices];
    newChoices.pop();
    updateQuestion(question.name, "choices", newChoices);
    setChoices(question.choices);
  };

  const handleEditChoice = (e, id) => {
    const newChoices = [...choices];
    const index = newChoices.findIndex((c) => c.id === id);
    newChoices[index].value = e.target.value;
    setChoices(newChoices);
  };

  const handleRemoveAll = () => {
    updateQuestion(question.name, "choices", []);
    setChoices([]);
  };

  return (
    <Container>
      <Row>
        <Form.Label>Choices</Form.Label>
      </Row>
      {choices &&
        choices.map((c) => (
          <Form>
            <Form.Group key={c.id}>
              <Row>
                <Col md={2}>
                  <Form.Label>Value</Form.Label>
                </Col>
                <Col md={10}>
                  <Form.Control
                    type="text"
                    placeholder="Add choice here ..."
                    value={c.value}
                    onChange={(e) => handleEditChoice(e, c.id)}
                    onBlur={() => updateQuestion(question.name, "choices", choices)}
                  />
                </Col>
              </Row>
            </Form.Group>
          </Form>
        ))}
      <Row>
        <Button className="shadow-none btn--blue qe__btn" onClick={handleAddChoice}>
          Add
        </Button>
        <Button className="shadow-none btn--blue qe__btn" onClick={handleRemoveChoice}>
          Remove
        </Button>
        <Button className="shadow-none btn--red qe__btn" onClick={handleRemoveAll}>
          Remove All
        </Button>
      </Row>
    </Container>
  );
};

Choices.propTypes = {
  question: PropTypes.shape({
    name: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired
    ),
  }).isRequired,
  updateQuestion: PropTypes.func.isRequired,
};

export default Choices;
