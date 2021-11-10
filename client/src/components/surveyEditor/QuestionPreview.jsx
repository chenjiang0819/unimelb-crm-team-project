/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import * as Survey from "survey-react";
import PropTypes from "prop-types";

const validate = (question) => {
  if (!["image", "html"].includes(question.type)) {
    if (!question.title) return "Question title can not be empty.";
    if (question.title.length < 5 || question.title.length > 100)
      return "Question title length must be between 5 - 100 characters.";
  }

  const values = new Set();

  switch (question.type) {
    case "radiogroup":
    case "checkbox":
      if (!question.choices || question.choices.length < 2)
        return "Multi-choices question must contain at least two choices";
      question.choices.forEach((c) => {
        values.add(c.value);
      });
      if (values.size !== question.choices.length || values.has(""))
        return "Multi-choices question can not have empty or duplicate choices.";
      if (question.colCount < 1 || question.colCount > 5) return "Column Count must be between 1 - 5.";
      break;
    case "dropdown":
    case "ranking":
      if (!question.choices || question.choices.length < 2)
        return "Multi-choices question must contain at least two choices";
      question.choices.forEach((c) => {
        values.add(c.value);
      });
      if (values.size !== question.choices.length || values.has(""))
        return "Multi-choices question can not have empty or duplicate choices.";
      break;
    case "boolean":
      if (!question.showTitle && !question.label) return "If no showing title, this question must have a label";
      if (!question.labelTrue || !question.labelFalse)
        return "Boolean question must have labels for both true and false sides.";
      break;
    case "rating":
      if (question.rateMax <= question.rateMin) return "Min rating must be lower than max rating.";
      if (question.rateStep < 1) return "Rate step must be greater or equal to 1";
      if (!question.minRateDescription || !question.maxRateDescription)
        return "Rating question must have descriptions for both min and max sides.";
      break;
    case "image":
      if (question.imageHeight <= 0 || question.imageWidth <= 0)
        return "Image width and height must be greater than 0 pixel.";
      break;
    case "html":
      if (!question.html || question.html.length === 0) return "HTML content can not be empty";
      break;
    default:
      break;
  }

  return "";
};

const QuestionPreview = ({ question, isActive, setActiveQuestion }) => {
  const json = {
    questions: [
      {
        type: question.type,
        title: question.title ? question.title : "Question Preview",
        name: question.name,
        isRequired: question.isRequired,
        placeHolder: ["text", "comment"].includes(question.type) ? question.placeHolder : undefined,
        inputType: question.type === "text" ? question.inputType : undefined,
        colCount: ["radiogroup", "checkbox"].includes(question.type) ? question.colCount : undefined,
        choices: ["radiogroup", "checkbox", "dropdown", "ranking", "imagepicker"].includes(question.type)
          ? question.choices.map((c) => c.value)
          : undefined,
        label: question.type === "boolean" ? question.label : "Question label",
        labelTrue: question.type === "boolean" ? question.labelTrue : undefined,
        labelFalse: question.type === "boolean" ? question.labelFalse : undefined,
        showTitle: question.type === "boolean" ? question.showTitle : undefined,
        rateMin: question.type === "rating" ? question.rateMin : undefined,
        rateMax: question.type === "rating" ? question.rateMax : undefined,
        rateStep: question.type === "rating" ? question.rateStep : undefined,
        minRateDescription: question.type === "rating" ? question.minRateDescription : undefined,
        maxRateDescription: question.type === "rating" ? question.maxRateDescription : undefined,
        imageHeight: question.type === "image" ? question.imageHeight : undefined,
        imageWidth: question.type === "image" ? question.imageWidth : undefined,
        imageFit: question.type === "image" ? question.imageFit : undefined,
        imageLink: question.type === "image" ? question.imageLink : undefined,
        html: question.type === "html" ? question.html : undefined,
      },
    ],
  };

  const message = validate(question);

  return (
    <>
      <div
        className={`se__qp ${isActive ? "se__qp--active" : ""} ${message ? "se__qp--error" : ""}`}
        onClick={() => setActiveQuestion(question.name)}
      >
        <Survey.Survey json={json} showQuestionNumbers="off" focusFirstQuestionAutomatic={false} />
      </div>
      {message && <p className="se__qp__text--error">* {message}</p>}
    </>
  );
};

QuestionPreview.propTypes = {
  question: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    placeHolder: PropTypes.string,
    inputType: PropTypes.string,
    colCount: PropTypes.number,
    choices: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired
    ),
    label: PropTypes.string,
    labelTrue: PropTypes.string,
    labelFalse: PropTypes.string,
    showTitle: PropTypes.bool,
    rateMin: PropTypes.number,
    rateMax: PropTypes.number,
    rateStep: PropTypes.number,
    minRateDescription: PropTypes.string,
    maxRateDescription: PropTypes.string,
    imageHeight: PropTypes.number,
    imageWidth: PropTypes.number,
    imageFit: PropTypes.string,
    imageLink: PropTypes.string,
    html: PropTypes.string,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  setActiveQuestion: PropTypes.func.isRequired,
};

export default QuestionPreview;
