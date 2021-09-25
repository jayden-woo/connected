/* eslint-disable no-underscore-dangle */
// import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
// import axios from "axios";
// import axios from "../../services/axios";
import styled from "styled-components";

// TEMP
import allSurveys from "./surveys";

const StyledDiv = styled.div`
  margin: 0 8vw;
  border: 1px solid var(--color-accent);
  background-color: white;
  text-align: center;
  @media (min-width: 768px) {
    margin: 0 12vw;
  }
  @media (min-width: 1200px) {
    margin: 0 20vw;
  }
`;

const Title = styled.p`
  font-size: 1.8rem;
  @media (min-width: 768px) {
    font-size: 2.2rem;
  }
  @media (min-width: 1024px) {
    font-size: 2.6rem;
  }
`;

const StyledImage = styled.img`
  height: 100vw;
  width: 40vw;
  max-height: 100%;
  max-width: 100%;
  object-fit: cover;
  object-position: left top;
  @media (min-width: 768px) {
    height: 40vw;
  }
`;

const SurveyBoard = () => {
  // const [allSurveys, setAllSurveys] = useState([]);
  console.log(allSurveys);

  // useEffect(() => {
  //   const baseUrl = process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_URL : "http://localhost:3000";
  //   axios.get(`${baseUrl}/api/surveys`).then((res) => {
  //   axios.get("/api/surveys").then((res) => {
  //     console.log(res);
  //     setAllSurveys(res.data);
  //   });
  // }, []);

  return (
    <StyledDiv>
      <Title className="pt-4 pb-2">Recommended for You</Title>
      <Carousel className="mx-5 my-3 border border-dark">
        {allSurveys.map((survey) => (
          <Carousel.Item key={survey._id}>
            <Link to={`/surveys/${survey._id}`}>
              <StyledImage className="d-block w-100" src={survey.imageUrl} alt="" />
              <Carousel.Caption>
                <h3>{survey.title}</h3>
                <p>{survey.description}</p>
                <small>Added on {new Date(survey.updatedAt).toUTCString()}</small>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
      <h3 className="pt-3 pb-4">
        Click <Link to="/surveys">Here</Link> for More Surveys!
      </h3>
    </StyledDiv>
  );
};

export default SurveyBoard;
