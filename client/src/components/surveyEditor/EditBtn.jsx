import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";

export default function EditBtn({
  handleDelete,
  handleAdd,
  handleRemove,
  handleSelect,
  handleUpload,
  showEditOptions,
  numOptions,
  canUpload,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const imageSelector = useRef();

  return (
    <div>
      <Row className="justify-content-center">
        <Button className="qe__btn qe__btn--mt btn--red shadow-none" onClick={handleDelete}>
          Delete
        </Button>
      </Row>
      {!isEditing && (
        <Row className="justify-content-center">
          <Button className="qe__btn btn--blue shadow-none" onClick={() => setIsEditing(!isEditing)}>
            Edit
          </Button>
        </Row>
      )}
      {isEditing && (
        <Row className="justify-content-center">
          <Button className="qe__btn btn--blue shadow-none" onClick={() => setIsEditing(!isEditing)}>
            Finish
          </Button>
        </Row>
      )}
      {isEditing && (
        <Row className="justify-content-center">
          <Button className="qe__btn btn--blue shadow-none" onClick={() => imageSelector.current.click()}>
            Add IMG
          </Button>
        </Row>
      )}
      {isEditing && (
        <Row className="justify-content-center">
          <Button className="qe__btn btn--blue shadow-none" onClick={handleUpload} disabled={!canUpload}>
            Upload
          </Button>
        </Row>
      )}
      {isEditing && showEditOptions && (
        <Row className="justify-content-center">
          <Button className="qe__btn btn--blue shadow-none" onClick={handleAdd}>
            Add
          </Button>
        </Row>
      )}
      {isEditing && showEditOptions && (
        <Row className="justify-content-center">
          <Button className="qe__btn btn--blue shadow-none" onClick={handleRemove} disabled={numOptions === 0}>
            Remove
          </Button>
        </Row>
      )}
      <input type="file" onChange={handleSelect} ref={imageSelector} accept="image/*" />
    </div>
  );
}

EditBtn.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
  showEditOptions: PropTypes.bool.isRequired,
  numOptions: PropTypes.number.isRequired,
  canUpload: PropTypes.bool.isRequired,
};
