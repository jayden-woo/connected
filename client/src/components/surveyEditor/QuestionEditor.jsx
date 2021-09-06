import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

// import { v4 as uuidv4 } from "uuid";
// import PropTypes from "prop-types";

// import uploadImage from "../../services/uploadImageService";
// import notify from "../../services/notifyService";

// import EditBtn from "./EditBtn";
// import Option from "./Option";

export default function QuestionEditor() {
  // export default function QuestionEditor({ question, handleDelete, updateQuestion, setProgressBar }) {
  // const [options, setOptions] = useState([]);
  // const [image, setImage] = useState({ src: "", alt: "" });

  // const handleAddOption = () => {
  //   const newOptions = [...options];
  //   newOptions.push({
  //     id: uuidv4(),
  //     content: "",
  //   });
  //   updateQuestion(question.name, "choices", newOptions);
  //   setOptions(newOptions);
  // };

  // const handleRemoveOption = () => {
  //   const newOptions = [...options];
  //   newOptions.pop();
  //   updateQuestion(question.name, "choices", newOptions);
  //   setOptions(newOptions);
  // };

  // const handleSaveOption = (oid, value) => {
  //   const newOptions = [...options];
  //   const index = options.findIndex((o) => o.id === oid);
  //   newOptions[index].content = value;
  //   updateQuestion(question.name, "choices", newOptions);
  //   setOptions(newOptions);
  // };

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter question title here ..." />
          <Form.Text className="text-muted" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Choices</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          <Button>Add New</Button>
          <Button>Remove All</Button>
        </Form.Group>
      </Form>
      {/* <Col>
            <Row>
              <Col sm={10} style={{ borderRight: "1px solid #ccc" }}>
                <EditText
                  className="edit-text qe__question"
                  placeholder="Click me to edit question title ..."
                  onSave={({ value }) => updateQuestion(question.name, "title", value)}
                />
                {image.src && <Image src={image.src} alt={image.alt} className="qe__image" />}
                {question.type !== "text" &&
                  options.map((o) => (
                    <Option key={o.id} type={question.type} onSave={({ value }) => handleSaveOption(o.id, value)} />
                  ))}
              </Col>
              <Col>
                <EditBtn
                  handleDelete={() => handleDelete(question.name)}
                  handleAdd={handleAddOption}
                  handleRemove={handleRemoveOption}
                  handleSelect={(e) => uploadImage.handleSelect(e, setImage)}
                  handleUpload={async () => {
                    updateQuestion(
                      question.name,
                      "image",
                      await uploadImage.handleUpload(
                        setProgressBar,
                        image,
                        () => notify.successNotify("Successfully uploaded!"),
                        () => notify.errorNotify("Upload failed, please try again.")
                      )
                    );
                  }}
                  showEditOptions={question.type !== "text"}
                  numOptions={options.length}
                  canUpload={!!image.src}
                />
              </Col>
            </Row>
          </Col> */}
    </div>
  );
}

// QuestionEditor.propTypes = {
//   question: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     choices: PropTypes.arrayOf(PropTypes.string.isRequired),
//   }).isRequired,
//   handleDelete: PropTypes.func.isRequired,
//   updateQuestion: PropTypes.func.isRequired,
//   setProgressBar: PropTypes.shape({
//     visible: PropTypes.bool.isRequired,
//     progress: PropTypes.number.isRequired,
//   }).isRequired,
// };
