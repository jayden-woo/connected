import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import _ from "lodash";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { EditText } from "react-edit-text";

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
    const newQuestions = [
      ...survey.questions,
      {
        title: "",
        type,
        name: uuidv4(),
      },
    ];
    setSurvey((prevState) => ({
      ...prevState,
      questions: newQuestions,
    }));
  };

  const handleDelete = (name) => {
    setActiveQuestion("");
    const newQuestions = [...survey.questions];
    const index = survey.questions.findIndex((q) => q.name === name);
    newQuestions.splice(index, 1);
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
    if (survey.questions.length === 0) {
      alert("Survey cannot be empty.");
      return false;
    }

    /* eslint-disable-next-line */
    for (const q of survey.questions) {
      if (q.title === "") {
        alert("All questions must have a title.");
        return false;
      }

      if (q.type !== "text") {
        if (!q.choices || q.choices.length < 2) {
          alert("Multiple option question must have at least 2 options.");
          return false;
        }

        /* eslint-disable-next-line */
        for (const c of q.choices) {
          if (c === "") {
            alert("Question cannot have empty option.");
            return false;
          }
        }
      }
    }

    return true;
  };

  const onSubmit = async () => {
    if (!validate()) {
      return;
    }

    const newQuestions = [];

    survey.questions.forEach((q) => {
      const newQ = _.cloneDeep(q);

      if (newQ.choices) {
        const choices = newQ.choices.map((c) => c.content);
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
      <div>
        <Container className="se__content">
          <Row>
            <Col sm={12} md={3} xl={2} style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <Button className="se__btn-add btn--red shadow-none" onClick={() => handleAdd("text")}>
                + Add Simple Text
              </Button>
              <Button className="se__btn-add btn--blue shadow-none" onClick={() => handleAdd("radiogroup")}>
                + Add Radiogroup
              </Button>
              <Button className="se__btn-add btn--green shadow-none" onClick={() => handleAdd("checkbox")}>
                + Add Checkbox
              </Button>
              <Button className="se__btn-add btn--green shadow-none" onClick={() => handleAdd("checkbox")}>
                + Add Checkbox
              </Button>
              <Button className="se__btn-add btn--green shadow-none" onClick={() => handleAdd("checkbox")}>
                + Add Checkbox
              </Button>
              <Button className="se__btn-add btn--green shadow-none" onClick={() => handleAdd("checkbox")}>
                + Add Checkbox
              </Button>
            </Col>
            <Col sm={12} md={5} xl={6} style={{ borderLeft: "1px solid #ccc", borderRight: "1px solid #ccc" }}>
              <div className="se__title-section">
                <Container className="se__title-container">
                  <Row>
                    <Col>
                      <EditText
                        className="edit-text se__title"
                        placeholder="Add title here ..."
                        onSave={({ value }) => setSurvey((prevState) => ({ ...prevState, title: value }))}
                      />
                      <EditText
                        className="edit-text se__sub-title"
                        placeholder="Add description here ..."
                        onSave={({ value }) =>
                          setSurvey((prevState) => ({
                            ...prevState,
                            description: value,
                          }))
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {thumbnail.src && <Image className="se__thumbnail" src={thumbnail.src} alt={thumbnail.alt} />}
                      <input
                        type="file"
                        onChange={(e) => {
                          uploadImage.handleSelect(e, setThumbnail);
                        }}
                        ref={imageSelector}
                        accept="image/*"
                      />
                      <Button className="se__thumbnail-btn shadow-none" onClick={() => imageSelector.current.click()}>
                        Select Thumbnail
                      </Button>
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
                </Container>
              </div>
              {survey.questions.map((q) => (
                // eslint-disable-next-line
                <QuestionPreview key={q.name} question={q} setActiveQuestion={setActiveQuestion} />
              ))}
            </Col>
            <Col sm={12} md={4} xl={4}>
              {activeQuestion && (
                <QuestionEditor
                  key={activeQuestion}
                  question={_.find(survey.questions, { name: activeQuestion })}
                  handleDelete={handleDelete}
                  updateQuestion={updateQuestion}
                  setProgressBar={setProgressBar}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
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
  setProgressBar: PropTypes.shape({
    visible: PropTypes.bool.isRequired,
    progress: PropTypes.number.isRequired,
  }).isRequired,
};
