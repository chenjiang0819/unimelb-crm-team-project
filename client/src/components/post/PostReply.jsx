import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { Col, Container, Row, Form, FloatingLabel, Overlay, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const PublishButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 2rem 0;
  font-size: 1.1rem;
  text-align: center;
  background-color: var(--color-primary);
  color: white;
  border: 0;
  border-radius: 0.75rem;
  width: auto;
  &:hover {
    filter: brightness(75%);
  }
  @media (min-width: 768px) {
    padding: 0.75rem 1.3rem;
    font-size: 1.2rem;
  }
  @media (min-width: 1024px) {
    padding: 0.75rem 2rem;
  }
`;

const PostReply = ({ onPublish }) => {
  const { isAuthenticated } = useAuth0();
  const [showTooltip, setShowTooltip] = useState(false);
  const target = useRef(null);
  const [reply, setReply] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    onPublish(reply);
    form.reset();
    setValidated(false);
  };

  return (
    <Container className="px-4 pt-4 pb-3">
      <Row>
        <Col as="p">
          {`Reply `}&nbsp;
          <FontAwesomeIcon icon="reply" size="lg" color="var(--color-primary)" />
        </Col>
      </Row>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col>
            <FloatingLabel controlId="postReply" label="Add more info to help us give you the best answer.">
              <Form.Control
                as="textarea"
                placeholder="Enter your reply here"
                className="shadow-none lh-base post-reply"
                style={{ height: "15rem" }}
                onChange={(e) => setReply(e.target.value)}
                minLength="5"
                maxLength="1000"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a message with length between 5 to 1000 characters.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {isAuthenticated ? (
            <PublishButton type="submit">Publish</PublishButton>
          ) : (
            <>
              <PublishButton ref={target} type="button" onClick={() => setShowTooltip(!showTooltip)}>
                Publish
              </PublishButton>
              <Overlay target={target.current} show={showTooltip} placement="top">
                {(props) => (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <Tooltip id="publish-tooltip" {...props}>
                    Please log in before publishing a new reply to the post.
                  </Tooltip>
                )}
              </Overlay>
            </>
          )}
        </Row>
      </Form>
    </Container>
  );
};

PostReply.propTypes = {
  onPublish: PropTypes.func.isRequired,
};

export default PostReply;
