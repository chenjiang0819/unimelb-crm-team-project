import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";

import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

import { useAuth0 } from "@auth0/auth0-react";
import UploadProgressBar from "../../components/common/UploadProgressBar";
import uploadImage from "../../helpers/uploadImageService";
import axios from "../../helpers/axios";
import notify from "../../helpers/notifyService";

import QuestionEditor from "../../components/surveyEditor/QuestionEditor";
import QuestionPreview from "../../components/surveyEditor/QuestionPreview";

import Forbidden from "../Forbidden";
import Loading from "../../components/Loading";

const audience =
  process.env.NODE_ENV === "production" ? "http://localhost:3000/" : "localhost:3000/api/";

const SurveyEditor = () => {
  const [survey, setSurvey] = useState({ questions: [] });
  const [thumbnail, setThumbnail] = useState({ src: "", alt: "" });
  const [activeQuestion, setActiveQuestion] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [progressBar, setProgressBar] = useState({
    visible: false,
    progress: 0,
  });
  const [error, setError] = useState({});

  const imageSelector = useRef();
  const topRef = useRef(null);

  const { user, getAccessTokenSilently, getIdTokenClaims, isAuthenticated, isLoading } = useAuth0();
  useEffect(async () => {
    if (isLoading || !isAuthenticated) return;

    const claims = await getIdTokenClaims();
    setIsAdmin(claims["http://localhost:3000/"][0] === "Admin");
  }, [isAuthenticated, isLoading]);

  // TODO: remove this
  const history = useHistory();

  const handleAdd = (type) => {
    const newQ = {
      title: "",
      type,
      name: uuidv4(),
      isRequired: false,
    };
    switch (type) {
      case "text":
        newQ.placeHolder = "";
        newQ.inputType = "text";
        break;
      case "radiogroup":
      case "checkbox":
        newQ.colCount = 1;
        newQ.choices = [];
        break;
      case "dropdown":
      case "ranking":
        newQ.choices = [];
        break;
      case "boolean":
        newQ.label = "";
        newQ.labelTrue = "Yes";
        newQ.labelFalse = "No";
        newQ.showTitle = false;
        break;
      case "rating":
        newQ.rateMin = 1;
        newQ.rateMax = 5;
        newQ.rateStep = 1;
        newQ.minRateDescription = "Lowest";
        newQ.maxRateDescription = "Highest";
        break;
      case "comment":
        newQ.placeHolder = "";
        break;
      case "image":
        newQ.imageLink =
          "https://res.cloudinary.com/ip-connected/image/upload/v1630900645/connected/oixg4zsudf6t5wx70knu.jpg";
        newQ.imageHeight = 300;
        newQ.imageWidth = 400;
        newQ.imageFit = "contain";
        break;
      case "html":
        newQ.html = "<p>Add your html here ... </p>";
        break;
      default:
        notify.errorNotify("Invalid question type!");
        break;
    }
    const newQuestions = [...survey.questions, newQ];
    setSurvey((prevState) => ({
      ...prevState,
      questions: newQuestions,
    }));
  };

  const handleDelete = (name) => {
    setActiveQuestion("");
    const newQuestions = [...survey.questions];
    _.remove(newQuestions, { name });
    setSurvey((prevState) => ({
      ...prevState,
      questions: newQuestions,
    }));
  };

  const handleMoveUp = (name) => {
    const newQuestions = [...survey.questions];
    const index = survey.questions.findIndex((q) => q.name === name);
    if (index === 0) return;
    const question = newQuestions[index];
    const prevQuestion = newQuestions[index - 1];
    newQuestions.splice(index, 1, prevQuestion);
    newQuestions.splice(index - 1, 1, question);
    setSurvey((prevState) => ({
      ...prevState,
      questions: newQuestions,
    }));
  };

  const handleMoveDown = (name) => {
    const newQuestions = [...survey.questions];
    const index = survey.questions.findIndex((q) => q.name === name);
    if (index === newQuestions.length - 1) return;
    const question = newQuestions[index];
    const nextQuestion = newQuestions[index + 1];
    newQuestions.splice(index, 1, nextQuestion);
    newQuestions.splice(index + 1, 1, question);
    setSurvey((prevState) => ({
      ...prevState,
      questions: newQuestions,
    }));
  };

  const updateQuestion = (name, key, value) => {
    const newQuestions = [...survey.questions];
    const index = survey.questions.findIndex((q) => q.name === name);
    newQuestions[index][key] = value;
    setSurvey((prevState) => ({
      ...prevState,
      questions: newQuestions,
    }));
  };

  const validateQuestion = (question) => {
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

  const validate = () => {
    if (!survey.title) {
      setError((prevState) => ({
        ...prevState,
        title: "Survey title can not be empty",
      }));
      return false;
    }

    if (survey.title.length < 5 || survey.title.length > 100) {
      setError((prevState) => ({
        ...prevState,
        title: "Survey title length must be between 5 - 100 characters",
      }));
      return false;
    }

    if (survey.description && (survey.description.length < 5 || survey.description.length > 100)) {
      setError((prevState) => ({
        ...prevState,
        description: "Survey description length must be between 5 - 1000 characters",
      }));
      return false;
    }

    if (!survey.questions || survey.questions.length === 0) {
      notify.errorNotify("Survey cannot be empty.");
      return false;
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const q of survey.questions) {
      const message = validateQuestion(q);
      if (message) {
        notify.errorNotify(message);
        return false;
      }
    }

    setError({});
    return true;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    const newQuestions = [];

    survey.questions.forEach((q) => {
      const newQ = _.cloneDeep(q);

      if (newQ.choices) {
        const choices = newQ.choices.map((c) => c.value);
        newQ.choices = choices;
      }

      newQuestions.push(newQ);
    });

    const data = {
      title: survey.title,
      description: survey.description,
      questions: newQuestions,
      creator: user.sub,
      thumbnail: survey.thumbnail,
    };

    if (!data.thumbnail) delete data.thumbnail;

    try {
      const accessToken = await getAccessTokenSilently({
        audience,
        scope: "edit:survey",
      });

      const res = await axios.post("/api/surveys", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      notify.successNotify("Successfully Published!");

      // eslint-disable-next-line no-underscore-dangle
      history.push(`/surveys/${res.data._id}`);
    } catch (e) {
      notify.errorNotify(e.response.data.message);
    }
  };

  if (isLoading || !isAuthenticated) return <Loading />;

  return (
    <>
      <UploadProgressBar progressBar={progressBar} />
      {isAdmin && (
        <div className="se-container">
          <div className="se__top-cut-off" />
          <Container className="se__content">
            <Row>
              <Col className="se__add-btn-group" md={12} xl={2}>
                <p className="se__tb__title">TOOLBOX</p>
                <Button className="se__btn-add shadow-none" onClick={() => handleAdd("text")}>
                  + Simple Text
                </Button>
                <Button className="se__btn-add shadow-none" onClick={() => handleAdd("radiogroup")}>
                  + Radiogroup
                </Button>
                <Button className="se__btn-add shadow-none" onClick={() => handleAdd("checkbox")}>
                  + Checkbox
                </Button>
                <Button className="se__btn-add shadow-none" onClick={() => handleAdd("dropdown")}>
                  + Dropdown
                </Button>
                <Button className="se__btn-add shadow-none" onClick={() => handleAdd("boolean")}>
                  + Boolean
                </Button>
                <Button className="se__btn-add shadow-none" onClick={() => handleAdd("rating")}>
                  + Rating
                </Button>
                <Button className="se__btn-add shadow-none" onClick={() => handleAdd("ranking")}>
                  + Ranking
                </Button>
                <Button className="se__btn-add shadow-none" onClick={() => handleAdd("comment")}>
                  + Comment
                </Button>
                <Button className="se__btn-add shadow-none" onClick={() => handleAdd("html")}>
                  + HTML
                </Button>
                <Button className="se__btn-add shadow-none" onClick={() => handleAdd("image")}>
                  + Image
                </Button>
              </Col>
              <Col className="se__survey-preview" md={12} xl={6} style={{ scrollBehavior: "smooth" }}>
                <Form ref={topRef}>
                  <Form.Group>
                    <Form.Label style={{ display: "none" }}>Survey Title</Form.Label>
                    <Form.Control
                      className={`shadow-none se__title ${error.title ? "se__input--error" : ""}`}
                      type="text"
                      placeholder="Enter survey title here ..."
                      onChange={(e) => {
                        setSurvey((prevState) => ({ ...prevState, title: e.target.value }));
                        setError((prevState) => ({ ...prevState, title: "" }));
                      }}
                    />
                    {error.title && <p className="se__text--error">* {error.title}</p>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label style={{ display: "none" }}>Survey Description</Form.Label>
                    <Form.Control
                      className={`shadow-none se__title se__desc ${error.description ? "se__input--error" : ""}`}
                      type="text"
                      placeholder="Enter survey description here ..."
                      onChange={(e) => {
                        setSurvey((prevState) => ({ ...prevState, description: e.target.value }));
                        setError((prevState) => ({ ...prevState, description: "" }));
                      }}
                    />
                  </Form.Group>
                  {error.description && <p className="se__text--error">* {error.description}</p>}
                </Form>
                <div className="se__thumbnail">
                  {thumbnail.src && <Image src={thumbnail.src} alt={thumbnail.alt} />}
                  <input
                    type="file"
                    onChange={(e) => {
                      uploadImage.handleSelect(e, setThumbnail);
                    }}
                    ref={imageSelector}
                    accept="image/*"
                  />
                  <Row>
                    <Col xs={12} md={6}>
                      <Button className="se__thumbnail-btn shadow-none" onClick={() => imageSelector.current.click()}>
                        Select Thumbnail
                      </Button>
                    </Col>
                    <Col xs={12} md={6}>
                      <Button
                        className="se__thumbnail-btn shadow-none"
                        disabled={!thumbnail.src}
                        onClick={async () => {
                          const url = await uploadImage.handleUpload(
                            setProgressBar,
                            thumbnail,
                            () => notify.successNotify("Successfully Uploaded!"),
                            () => notify.errorNotify("Upload failed, please try again.")
                          );
                          setSurvey((prevState) => ({ ...prevState, thumbnail: url }));
                        }}
                      >
                        Upload
                      </Button>
                    </Col>
                  </Row>
                </div>
                {survey.questions.length !== 0 &&
                  survey.questions.map((q) => (
                    <QuestionPreview
                      key={q.name}
                      question={q}
                      isActive={activeQuestion === q.name}
                      setActiveQuestion={setActiveQuestion}
                    />
                  ))}
                {survey.questions.length === 0 && <p className="se__empty">Add a question from the toolbox</p>}
              </Col>
              <Col md={12} xl={4}>
                <div className="se__pp">
                  <p className="se__pp__title">PROPERTY PANEL</p>
                  {activeQuestion && (
                    <QuestionEditor
                      key={`question:${activeQuestion}`}
                      question={_.find(survey.questions, { name: activeQuestion })}
                      index={survey.questions.findIndex((q) => q.name === activeQuestion)}
                      numQuestions={survey.questions.length}
                      handleDelete={handleDelete}
                      handleMoveUp={handleMoveUp}
                      handleMoveDown={handleMoveDown}
                      updateQuestion={updateQuestion}
                      setProgressBar={setProgressBar}
                    />
                  )}
                </div>
              </Col>
            </Row>
          </Container>
          <div className="se__bottom-cut-off">
            <Button
              className="shadow-none se__btn-back-to-top"
              onClick={(e) => {
                topRef.current.scrollIntoView();
                e.currentTarget.blur();
              }}
            >
              BACK TO TOP
            </Button>
          </div>
          <div className="se__publish">
            <Button className="se__btn-cancel shadow-none" onClick={history.goBack}>
              Cancel
            </Button>
            <Button className="se__btn-publish shadow-none" onClick={onSubmit}>
              Publish
            </Button>
          </div>
        </div>
      )}
      {!isAdmin && <Forbidden />}
    </>
  );
};

export default SurveyEditor;
