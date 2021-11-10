import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef, useState } from "react";
import { Col, Form, FloatingLabel, Overlay, Row, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "../../helpers/axios";

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 5%;
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
    padding: 0.75rem 2rem;
    font-size: 1.2rem;
  }
  @media (min-width: 1024px) {
    padding: 0.75rem 3rem;
  }
`;

const CancelButton = styled(SubmitButton)`
  background-color: grey;
`;

const CommentEdit = ({ pid, cid, prevContent, onSubmit, onCancelClick }) => {
  const { isAuthenticated } = useAuth0();
  const target = useRef(null);
  const contentRef = useRef(null);
  const [content, setContent] = useState(prevContent);
  const [validated, setValidated] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    axios
      .put(`/api/posts/${pid}/comments/${cid}`, {
        content,
        history: {
          content: prevContent,
        },
      })
      .then((res) => {
        toast.success("Your comment has been successfully edited.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          draggable: false,
          progress: undefined,
        });
        onSubmit(res.data);
        onCancelClick();
      });
  };

  useEffect(() => {
    contentRef.current.style.height = "0px";
    contentRef.current.style.height = `${contentRef.current.scrollHeight + 2}px`;
  }, [content]);

  return (
    <Form className="px-4" noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="py-2">
        <Col>
          <FloatingLabel controlId="postBody" label="Comment">
            <Form.Control
              as="textarea"
              ref={contentRef}
              value={content}
              placeholder="Enter your main body here"
              className="shadow-none lh-base"
              onChange={(e) => setContent(e.target.value)}
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
      <Row className="py-2 justify-content-center">
        {isAuthenticated ? (
          <SubmitButton type="submit">Submit</SubmitButton>
        ) : (
          <>
            <SubmitButton ref={target} type="button" onClick={() => setShowTooltip(!showTooltip)}>
              Submit
            </SubmitButton>
            <Overlay target={target.current} show={showTooltip} placement="top">
              {(props) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <Tooltip id="submit-tooltip" {...props}>
                  Please log in first before submitting the post.
                </Tooltip>
              )}
            </Overlay>
          </>
        )}
        <CancelButton type="button" onClick={onCancelClick}>
          Cancel
        </CancelButton>
      </Row>
    </Form>
  );
};

CommentEdit.propTypes = {
  pid: PropTypes.string.isRequired,
  cid: PropTypes.string.isRequired,
  prevContent: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
};

export default CommentEdit;
