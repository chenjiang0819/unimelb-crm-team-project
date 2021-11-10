import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Col, Container, Row, Modal } from "react-bootstrap";
import MediaQuery from "react-responsive";
// import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import axios from "../../helpers/axios";
import backgroundImg from "../../assets/mainHeader.png";
import PostStats from "./PostStats";
import PostComment from "./PostComment";
import PostContent from "./PostContent";
import PostReply from "./PostReply";
import Loading from "../Loading";

const Background = styled.div`
  background-color: var(--color-background);
  min-height: calc(100vh - var(--height-nav-bar) - var(--height-footer));
  margin-top: 80px;
  padding: 0 0 8vh;
  position: relative;
`;

const StyledImage = styled.img`
  height: 350px;
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  object-position: left bottom;
  @media (max-width: 480px) {
    height: 250px;
  }
`;

const StyledHeader = styled(Container)`
  // margin: -20px 8% 0;
  margin: -20px 0 0;
  padding: 1.5rem 2rem;
  // width: 84%;
  width: 100%;
  font-size: 1.2rem;
  text-align: left;
  color: white;
  background-color: var(--color-primary);
  position: absolute;
  max-width: 100%;
  @media (min-width: 768px) {
    margin: -30px 12% 0;
    width: 76%;
    font-size: 1.5rem;
  }
  @media (min-width: 1200px) {
    margin: -30px 20% 0;
    width: 60%;
  }
`;

const StyledDiv = styled.div`
  // margin: 0 8%;
  margin: 0;
  padding: 80px 2rem 30px;
  border: 1px solid var(--color-primary);
  background-color: white;
  max-width: 100%;
  @media (min-width: 768px) {
    margin: 0 12%;
  }
  @media (min-width: 1200px) {
    margin: 0 20%;
  }
`;

const FollowButton = styled.button`
  padding: 0.75rem 1rem;
  // margin: 1rem 10%;
  margin: 0.5rem 10%;
  max-width: 80%;
  font-size: 1.1rem;
  text-align: center;
  background-color: var(--color-primary);
  color: white;
  border: 0;
  border-radius: 0.75rem;
  &:hover {
    filter: brightness(75%);
  }
  @media (min-width: 768px) {
    margin: 1rem 10%;
    padding: 1rem 1.3rem;
    font-size: 1.2rem;
  }
  @media (min-width: 1024px) {
    padding: 1rem 2rem;
    font-size: 1.3rem;
  }
`;

const SolveButton = styled(FollowButton)`
  background-color: var(--color-secondary);
  &.solved {
    background-color: var(--color-accent);
  }
`;

const DeleteButton = styled(FollowButton)`
  background-color: var(--color-accent);
`;

const ConfirmDeleteButton = styled(DeleteButton)`
  font-size: 1.1rem;
  margin: 0.25rem 0.75rem;
  padding: 0.5rem 1rem;
`;

const CancelButton = styled(ConfirmDeleteButton)`
  background-color: grey;
`;

const Post = () => {
  const { id } = useParams();
  const history = useHistory();
  const { user, getIdTokenClaims, isAuthenticated } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [post, setPost] = useState();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(async () => {
    const users = await axios.get("/api/auth0/users").then((res) => res.data);
    await axios
      .get(`/api/posts/${id}`)
      .then((res) => axios.put(`/api/posts/${id}`, { views: res.data.views + 1 }))
      .then((res) => {
        const { data } = res;
        const postAuthor = users.find((u) => u.user_id === data.author.uid);
        data.author = {
          uid: postAuthor.user_id,
          name: postAuthor.nickname,
          picture: postAuthor.picture,
        };
        data.comments.map((comment) => {
          const commentAuthor = users.find((u) => u.user_id === comment.author.uid);
          // eslint-disable-next-line no-param-reassign
          comment.author = {
            uid: commentAuthor.user_id,
            name: commentAuthor.nickname,
            picture: commentAuthor.picture,
          };
          return comment;
        });
        setPost(data);
      });
  }, []);

  // Check for admin status everytime when isAuthenticated changes its value
  useEffect(async () => {
    const claims = await getIdTokenClaims();
    setIsAdmin(isAuthenticated && claims["http://localhost:3000/"][0] === "Admin");

    if (isAuthenticated && post !== undefined) {
      setIsAuthor(post.author.uid === user.sub);
    }
  }, [isAuthenticated, post]);

  const handleFollowClick = () => {
    const { followers } = post;
    const index = followers.indexOf(user.sub);
    // eslint-disable-next-line no-unused-expressions
    index === -1 ? followers.push(user.sub) : followers.splice(index, 1);
    axios.put(`/api/posts/${id}`, { followers }).then((res) => {
      setPost(res.data);
    });
  };

  const handleSolveClick = () => {
    axios.put(`/api/posts/${id}`, { solved: !post.solved }).then((res) => {
      setPost(res.data);
    });
  };

  const handlePostDeleteClick = () => {
    setShowConfirmation(false);
    axios.delete(`/api/posts/${id}`).then(() => {
      toast.success("Your post has been successfully deleted.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: false,
        progress: undefined,
      });
      setTimeout(() => {
        history.push("/");
      }, 3000);
    });
  };

  const handlePublish = (reply) => {
    const comment = {
      author: {
        uid: user.sub,
        name: user.email === user.name ? user.nickname : user.name,
        picture: user.picture,
      },
      content: reply,
    };
    // axios.put(`${baseUrl}/api/posts/${id}/comment`, { comments: [comment] }).then((res) => {
    axios.put(`/api/posts/${id}/comment`, { comments: [comment] }).then((res) => {
      setPost(res.data);
    });
  };

  if (post === undefined) {
    return <Loading />;
  }
  return (
    <Background>
      <StyledImage src={backgroundImg} />
      <StyledHeader>
        <Link className="text-white" to="/">{` Question Board `}</Link>
        &nbsp;&nbsp;&nbsp;
        <FontAwesomeIcon icon="arrow-right" size="sm" color="white" />
        &nbsp;&nbsp;&nbsp;
        {post.title.length < 60 ? post.title : post.title.substring(0, 60).concat("...")}
      </StyledHeader>
      <StyledDiv>
        <Container>
          <Row>
            <Col xs="12" md="8" className="ps-md-4">
              <MediaQuery maxWidth={767}>
                <Row>
                  <Col xs={isAuthenticated ? 8 : 12}>
                    <PostStats views={post.views} comments={post.comments.length} solved={post.solved} />
                  </Col>
                  <Col>
                    {/* Only show following button for authenticated users */}
                    {isAuthenticated && (
                      <Row>
                        <FollowButton type="button" onClick={handleFollowClick}>
                          {post.followers.includes(user.sub) ? (
                            <>
                              <FontAwesomeIcon icon="bell" size="lg" color="white" />
                              <MediaQuery minWidth={1024}>&nbsp;{` Following`}</MediaQuery>
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon icon="bell-slash" size="lg" color="white" />
                              <MediaQuery minWidth={1024}>&nbsp;{` Unfollowed`}</MediaQuery>
                            </>
                          )}
                        </FollowButton>
                      </Row>
                    )}
                    {/* Only show marking as solved for post owner */}
                    {isAuthor && (
                      <Row>
                        <SolveButton type="button" className={post.solved && "solved"} onClick={handleSolveClick}>
                          Mark {post.solved ? " Unsolved" : " Solved"}
                        </SolveButton>
                      </Row>
                    )}
                    {/* Only delete post for admin and post owner only */}
                    {/* {(isAdmin || (isAuthenticated && post.uid === user.sub)) && ( */}
                    {(isAdmin || isAuthor) && (
                      <Row>
                        <DeleteButton onClick={() => setShowConfirmation(true)}>Delete</DeleteButton>
                      </Row>
                    )}
                  </Col>
                </Row>
              </MediaQuery>
              <Row>
                <PostContent
                  // eslint-disable-next-line no-underscore-dangle
                  pid={post._id}
                  isAuthor={isAuthor}
                  author={post.author}
                  createdAt={post.createdAt}
                  title={post.title}
                  content={post.content}
                  history={post.history}
                  onDeleteClick={() => setShowConfirmation(true)}
                  setPost={setPost}
                  isAdmin={isAdmin}
                  sub={post.author.uid}
                />
              </Row>
              <Row>
                {post.comments.map((comment) => (
                  <PostComment
                    // eslint-disable-next-line no-underscore-dangle
                    key={comment._id}
                    // eslint-disable-next-line no-underscore-dangle
                    pid={post._id}
                    // eslint-disable-next-line no-underscore-dangle
                    cid={comment._id}
                    author={comment.author}
                    createdAt={comment.createdAt}
                    content={comment.content}
                    history={comment.history}
                    // onDeleteClick={handleCommentDeleteClick}
                    setPost={setPost}
                    sub={comment.author.uid}
                  />
                ))}
              </Row>
              <Row>
                <PostReply onPublish={handlePublish} />
              </Row>
            </Col>
            <Col xs="0" sm="4">
              <MediaQuery minWidth={768}>
                <Row>
                  <PostStats views={post.views} comments={post.comments.length} solved={post.solved} />
                </Row>
                {/* Only show following button for authenticated users */}
                {isAuthenticated && (
                  <Row>
                    <FollowButton type="button" onClick={handleFollowClick}>
                      {post.followers.includes(user.sub) ? (
                        <>
                          <FontAwesomeIcon icon="bell" size="lg" color="white" />
                          <MediaQuery minWidth={1024}>&nbsp;{` Following`}</MediaQuery>
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon="bell-slash" size="lg" color="white" />
                          <MediaQuery minWidth={1024}>&nbsp;{` Unfollowed`}</MediaQuery>
                        </>
                      )}
                    </FollowButton>
                  </Row>
                )}
                {/* Only show marking as solved for post owner */}
                {isAuthor && (
                  <Row>
                    <SolveButton type="button" className={post.solved && "solved"} onClick={handleSolveClick}>
                      Mark as {post.solved ? " Unsolved" : " Solved"}
                    </SolveButton>
                  </Row>
                )}
                {/* Only delete post for admin and post owner only */}
                {(isAdmin || isAuthor) && (
                  <Row>
                    <DeleteButton onClick={() => setShowConfirmation(true)}>Delete Post</DeleteButton>
                  </Row>
                )}
              </MediaQuery>
              <Modal className="%-100" show={showConfirmation} onHide={() => setShowConfirmation(false)}>
                <Modal.Header className="px-4" closeButton>
                  <Modal.Title>Delete Post?</Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-5 py-4 text-center">
                  <p className="m-0 p-1">Do you really want to permanently delete this post?</p>
                  <p className="m-0 p-1">This process cannot be undone.</p>
                </Modal.Body>
                <Modal.Footer>
                  <CancelButton onClick={() => setShowConfirmation(false)}>Cancel</CancelButton>
                  <ConfirmDeleteButton onClick={handlePostDeleteClick}>Delete</ConfirmDeleteButton>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </Container>
      </StyledDiv>
    </Background>
  );
};

export default Post;
