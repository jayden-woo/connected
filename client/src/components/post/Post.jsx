import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Spinner, Col, Container, Row, Modal } from "react-bootstrap";
import MediaQuery from "react-responsive";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import backgroundImg from "../../assets/mainHeader.png";
import PostStats from "./PostStats";
import PostContent from "./PostContent";
import PostReply from "./PostReply";

const Background = styled.div`
  background-color: var(--color-background);
  padding: 0 0 8vh;
  position: relative;
`;

const StyledImage = styled.img`
  height: 300px;
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  object-position: left bottom;
`;

const StyledHeader = styled(Container)`
  margin: -20px 8vw 0;
  padding: 1.5rem 2rem;
  width: 84vw;
  font-size: 1.2rem;
  text-align: left;
  color: white;
  background-color: var(--color-primary);
  position: absolute;
  max-width: 100%;
  @media (min-width: 768px) {
    margin: -30px 12vw 0;
    width: 76vw;
    font-size: 1.5rem;
  }
  @media (min-width: 1200px) {
    margin: -30px 20vw 0;
    width: 60vw;
  }
`;

const StyledDiv = styled.div`
  margin: 0 8vw;
  padding: 80px 2rem 30px;
  border: 1px solid var(--color-primary);
  background-color: white;
  max-width: 100vw;
  @media (min-width: 768px) {
    margin: 0 12vw;
  }
  @media (min-width: 1200px) {
    margin: 0 20vw;
  }
`;

const FollowButton = styled.button`
  padding: 0.75rem 1rem;
  margin: 1rem 10%;
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
  const baseUrl = process.env.API_URL || "http://localhost:3000";
  const { id } = useParams();
  const history = useHistory();
  const { user, isAuthenticated } = useAuth0();
  const [post, setPost] = useState();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/posts/${id}`)
      .then((res) => {
        console.log(res);
        // Increment the post view count
        return axios.put(`${baseUrl}/api/posts/${id}`, { views: res.data.views + 1 });
      })
      .then((res) => {
        console.log(res);
        setPost(res.data);
      });
  }, []);

  const handleFollowClick = () => {
    const { followers } = post;
    const index = followers.indexOf(user.sub);
    // eslint-disable-next-line no-unused-expressions
    index === -1 ? followers.push(user.sub) : followers.splice(index, 1);
    axios.put(`${baseUrl}/api/posts/${id}`, { followers }).then((res) => {
      console.log(res);
      setPost(res.data);
    });
  };

  const handleSolveClick = () => {
    axios.put(`${baseUrl}/api/posts/${id}`, { solved: !post.solved }).then((res) => {
      console.log(res);
      setPost(res.data);
    });
  };

  const handleDeleteClick = () => {
    setShowConfirmation(false);
    axios.delete(`${baseUrl}/api/posts/${id}`).then((res) => {
      console.log(res);
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
      uid: user.sub,
      content: reply,
    };
    axios.put(`${baseUrl}/api/posts/${id}/comment`, { comments: [comment] }).then((res) => {
      console.log(res);
      setPost(res.data);
    });
  };

  if (post === undefined) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" className="loading">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  return (
    <Background>
      <StyledImage src={backgroundImg} />
      <StyledHeader>
        <a className="text-white" href="/">{` Question Board `}</a>
        &nbsp;&nbsp;&nbsp;
        <FontAwesomeIcon icon="arrow-right" size="sm" color="white" />
        &nbsp;&nbsp;&nbsp;
        {post.title.length < 60 ? post.title : post.title.substring(0, 60).concat("...")}
      </StyledHeader>
      <StyledDiv>
        <Container>
          <Row>
            <Col xs="8" className="ps-4">
              <Row>
                <PostContent user={post.uid} createdAt={post.createdAt} title={post.title} content={post.content} />
              </Row>
              <Row>
                {post.comments.map((comment) => (
                  <PostContent
                    // eslint-disable-next-line no-underscore-dangle
                    key={comment._id}
                    user={comment.uid}
                    createdAt={comment.createdAt}
                    content={comment.content}
                  />
                ))}
              </Row>
              <Row>
                <PostReply onPublish={handlePublish} />
              </Row>
            </Col>
            <Col xs="4">
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
              {isAuthenticated && post.uid === user.sub && (
                <>
                  <Row>
                    <SolveButton type="button" className={post.solved && "solved"} onClick={handleSolveClick}>
                      Mark as {post.solved ? " Unsolved" : " Solved"}
                    </SolveButton>
                  </Row>
                  <Row>
                    <DeleteButton onClick={() => setShowConfirmation(true)}>Delete Post</DeleteButton>
                  </Row>
                  <Modal className="vw-100" show={showConfirmation} onHide={() => setShowConfirmation(false)}>
                    <Modal.Header className="px-4" closeButton>
                      <Modal.Title>Delete Post?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="px-5 py-4 text-center">
                      <p className="m-0 p-1">Do you really want to permanently delete this post?</p>
                      <p className="m-0 p-1">This process cannot be undone.</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <CancelButton onClick={() => setShowConfirmation(false)}>Cancel</CancelButton>
                      <ConfirmDeleteButton onClick={handleDeleteClick}>Delete</ConfirmDeleteButton>
                    </Modal.Footer>
                  </Modal>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </StyledDiv>
    </Background>
  );
};

export default Post;
