import { useEffect, useState } from "react";
import { Col, Container, Image, Button, Row, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import moment from "moment";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import _ from "lodash";
import axios from "../../helpers/axios";
import CommentEdit from "./CommentEdit";
import ModalProfile from "../profile/ModalProfile";

const LineBreak = styled.hr`
  border: 0;
  height: 1px;
  width: 90%;
  position: relative;
  margin: 20px auto;
  background: var(--color-primary);

  &:before {
    content: "";
    width: 6px;
    height: 6px;
    background: var(--color-primary);
    display: inline-block;
    border: 2px solid var(--color-primary);
    position: absolute;
    top: -2.5px;
    left: 50%;
    margin: 0 0 0 -3px;
    transform: rotate(45deg);
  }
`;

const TextButton = styled.button`
  padding: 0;
  background: none;
  border: none;
  &:hover {
    filter: brightness(75%);
  }
`;

const ConfirmDeleteButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0.25rem 0.75rem;
  max-width: 80%;
  font-size: 1.1rem;
  text-align: center;
  background-color: var(--color-accent);
  color: white;
  border: 0;
  border-radius: 0.75rem;
  &:hover {
    filter: brightness(75%);
  }
  @media (min-width: 768px) {
    padding: 1rem 1.3rem;
    font-size: 1.2rem;
  }
  @media (min-width: 1024px) {
    padding: 1rem 2rem;
    font-size: 1.3rem;
  }
`;

const CancelButton = styled(ConfirmDeleteButton)`
  background-color: grey;
`;

const PostComment = ({ pid, cid, author, createdAt, content, history, setPost, sub }) => {
  const date = new Date(createdAt);
  const editDate = history.length > 0 ? _.last(history).createdAt : null;
  const { user, getIdTokenClaims, isAuthenticated } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(async () => {
    const claims = await getIdTokenClaims();
    setIsAdmin(isAuthenticated && claims["http://localhost:3000/"][0] === "Admin");
    setIsAuthor(isAuthenticated && author.uid === user.sub);
  }, [isAuthenticated]);

  const handleDeleteClick = () => {
    setShowConfirmation(false);
    axios.delete(`/api/posts/${pid}/comments/${cid}`).then((res) => {
      toast.success("Your comment has been successfully deleted.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: false,
        progress: undefined,
      });
      setPost(res.data);
    });
  };

  return (
    <>
      <Container>
        <Row>
          <Col as="p" xs="8" className="ps-4 pe-2 pt-3">
            <Button className="post-img-button" disabled={!isAdmin} onClick={() => setModalShow(true)} variant="link">
              <Image src={author.picture} width="35" height="35" alt="ProfilePic" roundedCircle />
            </Button>
            <ModalProfile show={modalShow} onHide={() => setModalShow(false)} sub={sub} />
            &nbsp; {author.name}
          </Col>
          <Col as="p" xs="4" className="pe-4 pt-3 text-end">
            {moment(date).fromNow()}
          </Col>
        </Row>
        {isEditing ? (
          <Row>
            <CommentEdit
              pid={pid}
              cid={cid}
              prevContent={content}
              onSubmit={setPost}
              onCancelClick={() => setIsEditing(false)}
            />
          </Row>
        ) : (
          <Row>
            <Col as="p" className="px-4 pt-2 lh-base">
              {content}
            </Col>
          </Row>
        )}
        {(isAdmin || isAuthor || history.length > 0) && (
          <>
            <Row>
              {isAuthor && (
                <Col xs="4" sm="1" className="px-4 pt-2">
                  <TextButton onClick={() => setIsEditing(!isEditing)}>
                    <small className="text-muted">Edit</small>
                  </TextButton>
                </Col>
              )}
              {(isAuthor || isAdmin) && (
                <Col xs="4" sm="1" className="px-4 pt-2">
                  <TextButton onClick={() => setShowConfirmation(true)}>
                    <small className="text-muted">Delete</small>
                  </TextButton>
                </Col>
              )}
              {editDate && (
                <Col as="small" className="px-4 pt-2 text-end fst-italic text-muted">
                  {`edited ${moment(editDate).fromNow()}`}
                </Col>
              )}
            </Row>
            <Modal className="%-100" show={showConfirmation} onHide={() => setShowConfirmation(false)}>
              <Modal.Header className="px-4" closeButton>
                <Modal.Title>Delete Comment?</Modal.Title>
              </Modal.Header>
              <Modal.Body className="px-5 py-4 text-center">
                <p className="m-0 p-1">Do you really want to permanently delete this comment?</p>
                <p className="m-0 p-1">This process cannot be undone.</p>
              </Modal.Body>
              <Modal.Footer>
                <CancelButton onClick={() => setShowConfirmation(false)}>Cancel</CancelButton>
                <ConfirmDeleteButton onClick={handleDeleteClick}>Delete</ConfirmDeleteButton>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </Container>
      <LineBreak />
    </>
  );
};

PostComment.defaultProps = {
  author: {
    uid: "",
    name: "",
    picture: "",
  },
  history: [],
};

PostComment.propTypes = {
  pid: PropTypes.string.isRequired,
  cid: PropTypes.string.isRequired,
  author: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }),
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  history: PropTypes.arrayOf(PropTypes.object),
  setPost: PropTypes.func.isRequired,
  sub: PropTypes.string.isRequired,
};

export default PostComment;
