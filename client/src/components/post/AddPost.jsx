import { useRef, useState } from "react";
import { Image, Col, Container, Row, Form, FloatingLabel, Tooltip, Overlay, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import backgroundImg from "../../assets/mainHeader.png";

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
  padding: 60px 2rem 30px;
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

const FormLabel = styled(Form.Label)`
  font-size: 1.5rem;
  padding: 0 0.5rem 0;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 2rem 5%;
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

const AddPost = () => {
  const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
  const { user, isAuthenticated } = useAuth0();
  const [showTooltip, setShowTooltip] = useState(false);
  const target = useRef(null);
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    axios.post(`${baseUrl}/api/posts`, { uid: user.sub, title, content }).then((res) => {
      console.log(res);
      toast.success("Your post has been successfully submitted.", {
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
        // eslint-disable-next-line no-underscore-dangle
        history.push(`/posts/${res.data._id}`);
      }, 3000);
    });
  };

  return (
    <Background>
      <StyledImage src={backgroundImg} />
      <StyledHeader>
        <a className="text-white" href="/">{` Question Board `}</a>
        &nbsp;&nbsp;&nbsp;
        <FontAwesomeIcon icon="arrow-right" size="sm" color="white" />
        &nbsp;&nbsp;&nbsp;
        {` New Post `}
      </StyledHeader>
      <StyledDiv>
        <Container className="px-4 pt-3 pb-3">
          {isAuthenticated ? (
            <Row className="px-4 py-2 align-items-center">
              <Col>
                <Image src={user.picture} width="30" height="30" alt="ProfilePic" roundedCircle />
                &nbsp;&nbsp;&nbsp;
                {user.email === user.name ? user.nickname : user.name}
              </Col>
            </Row>
          ) : (
            <Alert className="mx-4 py-2 text-center" variant="danger">
              You need to be logged in first before submitting a new post to the forum!
            </Alert>
          )}
          <Form className="px-4" noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="py-2">
              <Col>
                <FormLabel>Title</FormLabel>
                <FloatingLabel controlId="postTitle" label="What's your question?">
                  <Form.Control
                    as="textarea"
                    placeholder="Enter your title here"
                    className="lh-base"
                    style={{ height: "10rem" }}
                    onChange={(e) => setTitle(e.target.value)}
                    minLength="5"
                    maxLength="1000"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a title with length between 5 to 1000 characters.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="py-2">
              <Col>
                <FormLabel>Main Body</FormLabel>
                <FloatingLabel controlId="postBody" label="Add more info to help us give you the best answer.">
                  <Form.Control
                    as="textarea"
                    placeholder="Enter your main body here"
                    className="lh-base"
                    style={{ height: "30rem" }}
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
              <CancelButton type="button" onClick={() => history.push("/")}>
                Cancel
              </CancelButton>
            </Row>
          </Form>
        </Container>
      </StyledDiv>
    </Background>
  );
};

export default AddPost;
