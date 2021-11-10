import { Col, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import MediaQuery from "react-responsive";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  border: 1px solid var(--color-primary);
  border-radius: 0.75rem;
  margin: 0.5rem 0;
  font-size: 1.1rem;
  max-width: 100%;
  @media (min-width: 768px) {
    margin: 1rem 10%;
    max-width: 80%;
  }
`;

const PostStats = ({ views, comments, solved }) => (
  <StyledContainer>
    <Row className="px-1 py-2 p-md-3 pt-4 align-items-center">
      <Col>
        <FontAwesomeIcon icon="eye" size="lg" color="var(--color-primary)" />
        &nbsp;{` ${views}`}
        {views > 1 ? ` Views` : ` View`}
        {/* <MediaQuery minWidth={768}>{views > 1 ? ` Views` : ` View`}</MediaQuery> */}
      </Col>
    </Row>
    <Row className="px-1 py-2 p-md-3 align-items-center">
      <Col>
        <FontAwesomeIcon icon="comments" size="lg" color="var(--color-primary)" />
        &nbsp;{` ${comments}`}
        {comments > 1 ? ` Comments` : ` Comment`}
        {/* <MediaQuery minWidth={768}>{comments > 1 ? ` Comments` : ` Comment`}</MediaQuery> */}
      </Col>
    </Row>
    <Row className="px-1 py-2 p-md-3 pb-4 align-items-center">
      <Col>
        {solved ? (
          <>
            <FontAwesomeIcon icon="check-circle" size="lg" color="var(--bs-success)" />
            &nbsp;{` Solved`}
            {/* <MediaQuery minWidth={768}>&nbsp;{` Solved`}</MediaQuery> */}
          </>
        ) : (
          <>
            <FontAwesomeIcon icon="times-circle" size="lg" color="var(--bs-danger)" />
            &nbsp;{` Unsolved`}
            {/* <MediaQuery minWidth={768}>&nbsp;{` Unsolved`}</MediaQuery> */}
          </>
        )}
      </Col>
    </Row>
  </StyledContainer>
);

PostStats.defaultProps = {
  views: 0,
  comments: 0,
  solved: false,
};

PostStats.propTypes = {
  views: PropTypes.number,
  comments: PropTypes.number,
  solved: PropTypes.bool,
};

export default PostStats;
