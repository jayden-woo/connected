import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";

import _ from "lodash";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import uploadImage from "../../services/uploadImageService";
import http from "../../services/httpService";
import notify from "../../services/notifyService";

import QuestionEditor from "./QuestionEditor";
import QuestionPreview from "./QuestionPreview";

export default function SurveyEditor({ setProgressBar }) {
  const [survey, setSurvey] = useState({ questions: [] });
  const [thumbnail, setThumbnail] = useState({ src: "", alt: "" });
  const [activeQuestion, setActiveQuestion] = useState("");

  const imageSelector = useRef();

  // TODO: remove this
  const history = useHistory();

  const handleAdd = (type) => {
    const newQ = {
      title: "",
      type,
      name: uuidv4(),
      isRequired: false,
    };
    switch (type) {
      case "text":
        newQ.placeHolder = "";
        newQ.inputType = "text";
        break;
      case "radiogroup":
      case "checkbox":
        newQ.colCount = 1;
        newQ.choices = [];
        break;
      case "dropdown":
      case "ranking":
        newQ.choices = [];
        break;
      case "boolean":
        newQ.label = "Question label";
        newQ.labelTrue = "Yes";
        newQ.labelFalse = "No";
        newQ.showTitle = false;
        break;
      case "rating":
        newQ.rateMin = 1;
        newQ.rateMax = 5;
        newQ.rateStep = 1;
        newQ.minRateDescription = "Lowest";
        newQ.maxRateDescription = "Highest";
        break;
      case "comment":
        newQ.placeHolder = "";
        break;
      case "image":
        newQ.imageLink =
          "https://res.cloudinary.com/ip-connected/image/upload/v1630900645/connected/oixg4zsudf6t5wx70knu.jpg";
        newQ.imageHeight = "300px";
        newQ.imageWidth = "400px";
        newQ.imageFit = "contain";
        break;
      case "html":
        newQ.html = "<p>Add your html here ... </p>";
        break;
      default:
        notify.errorNotify("Invalid question type!");
        break;
    }
    const newQuestions = [...survey.questions, newQ];
    setSurvey((prevState) => ({
      ...prevState,
      questions: newQuestions,
    }));
  };

  const handleDelete = (name) => {
    setActiveQuestion("");
    const newQuestions = [...survey.questions];
    _.remove(newQuestions, { name });
    setSurvey((prevState) => ({
      ...prevState,
      questions: newQuestions,
    }));
  };

  const handleMoveUp = (name) => {
    const newQuestions = [...survey.questions];
    const index = survey.questions.findIndex((q) => q.name === name);
    if (index === 0) return;
    const question = newQuestions[index];
    const prevQuestion = newQuestions[index - 1];
    newQuestions.splice(index, 1, prevQuestion);
    newQuestions.splice(index - 1, 1, question);
    setSurvey((prevState) => ({
      ...prevState,
      questions: newQuestions,
    }));
  };

  const handleMoveDown = (name) => {
    const newQuestions = [...survey.questions];
    const index = survey.questions.findIndex((q) => q.name === name);
    if (index === newQuestions.length - 1) return;
    const question = newQuestions[index];
    const nextQuestion = newQuestions[index + 1];
    newQuestions.splice(index, 1, nextQuestion);
    newQuestions.splice(index + 1, 1, question);
    setSurvey((prevState) => ({
      ...prevState,
      questions: newQuestions,
    }));
  };

  const updateQuestion = (name, key, value) => {
    const newQuestions = [...survey.questions];
    const index = survey.questions.findIndex((q) => q.name === name);
    newQuestions[index][key] = value;
    setSurvey((prevState) => ({
      ...prevState,
      questions: newQuestions,
    }));
  };

  // TODO: proper validation
  const validate = () => {
    // if (survey.questions.length === 0) {
    //   alert("Survey cannot be empty.");
    //   return false;
    // }
    // /* eslint-disable-next-line */
    // for (const q of survey.questions) {
    //   if (q.title === "") {
    //     alert("All questions must have a title.");
    //     return false;
    //   }
    //   if (q.type !== "text") {
    //     if (!q.choices || q.choices.length < 2) {
    //       alert("Multiple option question must have at least 2 options.");
    //       return false;
    //     }
    //     /* eslint-disable-next-line */
    //     for (const c of q.choices) {
    //       if (c === "") {
    //         alert("Question cannot have empty option.");
    //         return false;
    //       }
    //     }
    //   }
    // }
    // return true;
  };

  const onSubmit = async () => {
    if (!validate()) console.log("sdfsdf");

    const newQuestions = [];

    survey.questions.forEach((q) => {
      const newQ = _.cloneDeep(q);

      if (newQ.choices) {
        const choices = newQ.choices.map((c) => c.value);
        newQ.choices = choices;
      }

      newQuestions.push(newQ);
    });

    const data = {
      title: survey.title,
      description: survey.description,
      questions: newQuestions,
      creator: "auth0|6110b5c4c61fd70077d2819d",
      thumbnail: survey.thumbnail,
    };

    if (!data.thumbnail) delete data.thumbnail;

    console.log(data);

    // TODO: remove unneccesary lines
    try {
      const res = await http.post("http://localhost:3000/api/surveys", data);
      notify.successNotify("Successfully Published!");
      console.log(res.data);
      // eslint-disable-next-line no-underscore-dangle
      history.push(`/surveys/${res.data._id}`);
    } catch (e) {
      notify.errorNotify(e.response.data.message);
    }
  };

  return (
    <div className="se__container">
      <div className="se__top-cut-off" />
      <Container className="se__content">
        <Row>
          <Col className="se__add-btn-group" sm={12} md={3} xl={2}>
            <Button className="se__btn-add shadow-none" onClick={() => handleAdd("text")}>
              + Simple Text
            </Button>
            <Button className="se__btn-add shadow-none" onClick={() => handleAdd("radiogroup")}>
              + Radiogroup
            </Button>
            <Button className="se__btn-add shadow-none" onClick={() => handleAdd("checkbox")}>
              + Checkbox
            </Button>
            <Button className="se__btn-add shadow-none" onClick={() => handleAdd("dropdown")}>
              + Dropdown
            </Button>
            <Button className="se__btn-add shadow-none" onClick={() => handleAdd("boolean")}>
              + Boolean
            </Button>
            <Button className="se__btn-add shadow-none" onClick={() => handleAdd("rating")}>
              + Rating
            </Button>
            <Button className="se__btn-add shadow-none" onClick={() => handleAdd("ranking")}>
              + Ranking
            </Button>
            <Button className="se__btn-add shadow-none" onClick={() => handleAdd("comment")}>
              + Comment
            </Button>
            <Button className="se__btn-add shadow-none" onClick={() => handleAdd("html")}>
              + HTML
            </Button>
            <Button className="se__btn-add shadow-none" onClick={() => handleAdd("image")}>
              + Image
            </Button>
          </Col>
          <Col className="se__survey-preview" sm={12} md={5} xl={6}>
            <Form>
              <Form.Group>
                <Form.Label style={{ display: "none" }}>Survey Title</Form.Label>
                <Form.Control
                  className="shadow-none se__title"
                  type="text"
                  placeholder="Enter survey title here ..."
                  onChange={(e) => setSurvey((prevState) => ({ ...prevState, title: e.target.value }))}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ display: "none" }}>Survey Description</Form.Label>
                <Form.Control
                  className="shadow-none se__title se__desc"
                  type="text"
                  placeholder="Enter survey description here ..."
                  onChange={(e) => setSurvey((prevState) => ({ ...prevState, description: e.target.value }))}
                />
              </Form.Group>
            </Form>
            <div className="se__thumbnail">
              {thumbnail.src && <Image src={thumbnail.src} alt={thumbnail.alt} />}
              <input
                type="file"
                onChange={(e) => {
                  uploadImage.handleSelect(e, setThumbnail);
                }}
                ref={imageSelector}
                accept="image/*"
              />
              <Row>
                <Col xs={12} md={6}>
                  <Button className="se__thumbnail-btn shadow-none" onClick={() => imageSelector.current.click()}>
                    Select Thumbnail
                  </Button>
                </Col>
                <Col xs={12} md={6}>
                  <Button
                    className="se__thumbnail-btn shadow-none"
                    disabled={!thumbnail.src}
                    onClick={async () => {
                      const url = await uploadImage.handleUpload(
                        setProgressBar,
                        thumbnail,
                        () => notify.successNotify("Successfully Uploaded!"),
                        () => notify.errorNotify("Upload failed, please try again.")
                      );
                      setSurvey((prevState) => ({ ...prevState, thumbnail: url }));
                    }}
                  >
                    Upload
                  </Button>
                </Col>
              </Row>
            </div>
            {survey.questions.map((q) => (
              <QuestionPreview
                key={q.name}
                question={q}
                isActive={activeQuestion === q.name}
                setActiveQuestion={setActiveQuestion}
              />
            ))}
          </Col>
          <Col sm={12} md={4} xl={4}>
            <p>PROPERTIES</p>

            {activeQuestion && (
              <QuestionEditor
                key={activeQuestion}
                question={_.find(survey.questions, { name: activeQuestion })}
                index={survey.questions.findIndex((q) => q.name === activeQuestion)}
                numQuestions={survey.questions.length}
                handleDelete={handleDelete}
                handleMoveUp={handleMoveUp}
                handleMoveDown={handleMoveDown}
                updateQuestion={updateQuestion}
                setProgressBar={setProgressBar}
              />
            )}
          </Col>
        </Row>
      </Container>
      <div className="se__bottom-cut-off">
        <a href="#top">BACK TO TOP</a>
      </div>
      <div className="se__publish">
        <Button className="se__btn-cancel shadow-none">Cancel</Button>
        <Button className="se__btn-publish shadow-none" onClick={onSubmit}>
          Publish
        </Button>
      </div>
    </div>
  );
}

SurveyEditor.propTypes = {
  setProgressBar: PropTypes.func.isRequired,
};
