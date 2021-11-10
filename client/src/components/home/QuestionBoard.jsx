/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from "react";
import { Col, Collapse, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
// import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRight,
  faSearch,
  faFilter,
  faEye,
  faComments,
  faCheckCircle,
  faTimesCircle,
  faBell,
  faBellSlash,
  faReply,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import axios from "../../helpers/axios";
import PostSummary from "./PostSummary";
import SearchBar from "./SearchBar";
import FilterMenu from "./FilterMenu";

const INITIAL_MAX_POSTS = 3;

library.add(
  faArrowRight,
  faSearch,
  faFilter,
  faEye,
  faComments,
  faCheckCircle,
  faTimesCircle,
  faBell,
  faBellSlash,
  faReply
);

const StyledDiv = styled.div`
  // margin: 0 8%;
  margin: 0;
  border: 1px solid var(--color-primary);
  background-color: white;
  @media (min-width: 768px) {
    margin: 0 12%;
  }
  @media (min-width: 1200px) {
    margin: 0 20%;
  }
`;

const LoadingContainer = styled.div`
  margin: 6vh 0;
  width: 100%;
  text-align: center;
`;

const StyledContainer = styled(Container)`
  margin: 30px 0;
  padding: 0;
  max-width: 100%;
`;

const StyledLink = styled(Link)`
  color: var(--color-text);
  &:hover {
    color: var(--color-text);
  }
`;

const CenterDiv = styled.div`
  text-align: center;
`;

const StyledButton = styled.button`
  font-size: 1.1rem;
  text-align: center;
  background-color: var(--color-primary);
  color: white;
  border: 0;
  border-radius: 0.75rem;
  transition: filter 0.3s;
  &:hover {
    filter: brightness(75%);
  }
  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
  @media (min-width: 1024px) {
    font-size: 1.3rem;
  }
`;

const AddButton = styled(StyledButton)`
  // padding: auto 1rem;
  float: right;
  height: 100%;
  width: 90%;
  @media (max-width: 576px) {
    width: 100%;
    margin-top: 0.5rem;
  }
`;

const ShowButton = styled(StyledButton)`
  padding: 0.4rem 1.2rem;
  margin: 0 1rem 2rem;
  display: inline-block;
  box-sizing: border-box;
  text-decoration: none;
  transition: all 0.2s;
  @media (min-width: 768px) {
    margin: 0 2.5rem 2rem;
  }
`;

const QuestionBoard = () => {
  const { user, isAuthenticated } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const [searchTok, setSearchTok] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({
    solved: "none",
    following: "none",
    mine: "none",
    sort: "newest",
  });
  const [maxPosts, setMaxPosts] = useState(INITIAL_MAX_POSTS);

  useEffect(async () => {
    const users = await axios.get("/api/auth0/users").then((res) => res.data);
    await axios.get("/api/posts").then((res) => {
      const { data } = res;
      data.map((post) => {
        const author = users.find((u) => u.user_id === post.author.uid);
        // eslint-disable-next-line no-param-reassign
        post.author = {
          uid: author.user_id,
          name: author.nickname,
          picture: author.picture,
        };
        return post;
      });
      // setAllPosts(res.data);
      setAllPosts(data);
      setIsLoading(false);
    });
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setFilter({
      solved: e.target.elements.filterSolvedOption.value,
      following: e.target.elements.filterFollowingOption.value,
      mine: e.target.elements.filterMineOption.value,
      sort: e.target.elements.filterSortRadios.value,
    });
    setShowFilter(!showFilter);
    setMaxPosts(INITIAL_MAX_POSTS);
  };

  const handleShowButtonClick = (e) => {
    if (e.target.value === "showMore") {
      setMaxPosts(maxPosts + INITIAL_MAX_POSTS);
    } else if (e.target.value === "showLess") {
      setMaxPosts(maxPosts - INITIAL_MAX_POSTS);
    }
  };

  const posts = allPosts
    .map((post) => ({
      ...post,
      following: isAuthenticated && post.followers.includes(user.sub),
    }))
    .filter((post) => {
      if (searchTok !== "") {
        return post.title.includes(searchTok) || post.content.includes(searchTok);
      }
      return true;
    })
    .filter((post) => {
      // let display = true;
      if (filter.solved !== "none" && post.solved.toString() !== filter.solved) {
        // display = false;
        return false;
      }
      if (filter.following !== "none" && post.following.toString() !== filter.following) {
        // display = false;
        return false;
      }
      if (isAuthenticated && filter.mine !== "none") {
        // if (filter.mine === "true" && post.uid !== user.sub) {
        if (filter.mine === "true" && post.author.uid !== user.sub) {
          // display = false;
          return false;
        }
        // if (filter.mine === "false" && post.uid === user.sub) {
        if (filter.mine === "false" && post.author.uid === user.sub) {
          // display = false;
          return false;
        }
      }
      // return display;
      return true;
    })
    .sort((a, b) => {
      if (filter.sort === "newest") {
        return a.createdAt > b.createdAt ? -1 : 1;
      }
      if (filter.sort === "alphabetical") {
        return a.title < b.title ? -1 : 1;
      }
      if (filter.sort === "views") {
        return a.views > b.views ? -1 : 1;
      }
      if (filter.sort === "comments") {
        return a.comments.length > b.comments.length ? -1 : 1;
      }
      return 0;
    });

  return (
    <StyledDiv>
      <StyledContainer>
        <Row className="align-items-center" style={{ margin: "0 5%" }}>
          <Col xs={12} sm={8} style={{ padding: "0", height: "3rem", display: "flex", alignItems: "center" }}>
            <SearchBar onSearchEntry={setSearchTok} onFilterClick={() => setShowFilter(!showFilter)} />
          </Col>
          <Col xs={14} sm={4} style={{ padding: "0", height: "3rem" }}>
            <StyledLink to="/posts/add">
              <AddButton className="shadow-none" type="button">
                Ask a Question
              </AddButton>
            </StyledLink>
          </Col>
        </Row>
        <Collapse in={showFilter}>
          <div>
            <FilterMenu isAuthenticated={isAuthenticated} handleFilterSubmit={handleFilterSubmit} />
          </div>
        </Collapse>
      </StyledContainer>

      {isLoading && (
        <LoadingContainer>
          <Spinner animation="border" role="status" />
        </LoadingContainer>
      )}
      {posts.slice(0, Math.min(posts.length, maxPosts)).map((post) => (
        <PostSummary
          key={post._id}
          postId={post._id}
          title={post.title}
          body={post.content}
          author={post.author.name}
          createdAt={post.createdAt}
          views={post.views}
          comments={post.comments}
          solved={post.solved}
          following={post.following}
        />
      ))}
      {!isLoading && posts.length === 0 && (
        <CenterDiv className="px-5 pb-4">
          <h4>Sorry, no results found.</h4>
          <h4>Try using different keywords or remove some filters to broaden your search.</h4>
        </CenterDiv>
      )}
      <CenterDiv>
        {posts.length > maxPosts && (
          <ShowButton type="button" onClick={handleShowButtonClick} value="showMore">
            Show More
          </ShowButton>
        )}
        {maxPosts > INITIAL_MAX_POSTS && (
          <ShowButton type="button" onClick={handleShowButtonClick} value="showLess">
            Show Less
          </ShowButton>
        )}
      </CenterDiv>
    </StyledDiv>
  );
};

export default QuestionBoard;
