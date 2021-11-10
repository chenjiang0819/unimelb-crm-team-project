import { useState } from "react";
import { Col, Container, Image, Row, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import moment from "moment";
import styled from "styled-components";
import _ from "lodash";
import PostEdit from "./PostEdit";
import ModalProfile from "../profile/ModalProfile";

const TextButton = styled.button`
  padding: 0;
  background: none;
  border: none;
  &:hover {
    filter: brightness(75%);
  }
`;

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

const PostContent = ({
  pid,
  isAuthor,
  author,
  createdAt,
  title,
  content,
  history,
  onDeleteClick,
  setPost,
  isAdmin,
  sub,
}) => {
  const date = new Date(createdAt);
  const editDate = history.length > 0 ? _.last(history).createdAt : null;
  const [isEditing, setIsEditing] = useState(false);
  const [modalShow, setModalShow] = useState(false);

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
            <PostEdit
              pid={pid}
              prevTitle={title}
              prevContent={content}
              onSubmit={setPost}
              onCancelClick={() => setIsEditing(false)}
            />
          </Row>
        ) : (
          <>
            <Row>
              <Col as="h2" className="px-4 py-1 lh-base">
                {title}
              </Col>
            </Row>
            <Row>
              <Col as="p" className="px-4 pt-2 lh-base">
                {content}
              </Col>
            </Row>
          </>
        )}
        {(isAuthor || history.length > 0) && (
          <Row>
            {isAuthor && (
              <>
                <Col xs="4" sm="1" className="px-4 pt-2">
                  <TextButton onClick={() => setIsEditing(!isEditing)}>
                    <small className="text-muted">Edit</small>
                  </TextButton>
                </Col>
                <Col xs="4" sm="1" className="px-4 pt-2">
                  <TextButton onClick={onDeleteClick}>
                    <small className="text-muted">Delete</small>
                  </TextButton>
                </Col>
              </>
            )}
            {editDate && (
              <Col as="small" className="px-4 pt-2 text-end fst-italic text-muted">
                {`edited ${moment(editDate).fromNow()}`}
              </Col>
            )}
          </Row>
        )}
      </Container>
      <LineBreak />
    </>
  );
};

PostContent.defaultProps = {
  // title: "",
  author: {
    name: "",
    picture: "",
  },
  history: [],
  isAdmin: false,
};

PostContent.propTypes = {
  pid: PropTypes.string.isRequired,
  isAuthor: PropTypes.bool.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }),
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  history: PropTypes.arrayOf(PropTypes.object),
  onDeleteClick: PropTypes.func.isRequired,
  setPost: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  sub: PropTypes.string.isRequired,
};

export default PostContent;
