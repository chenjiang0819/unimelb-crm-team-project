import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

import uploadImage from "../../../helpers/uploadImageService";
import notify from "../../../helpers/notifyService";

const ImageProp = ({ question, updateQuestion, setProgressBar }) => {
  const [imageHeight, setImageHeight] = useState("");
  const [imageWidth, setImageWidth] = useState("");
  const [imageFit, setImageFit] = useState("");
  const [image, setImage] = useState({ src: "", alt: "" });

  const imageSelector = useRef();

  useEffect(() => {
    setImageHeight(question.imageHeight);
    setImageWidth(question.imageWidth);
    setImageFit(question.imageFit);
  }, []);

  return (
    <Form>
      <Form.Group>
        <Form.Label>Image Height (px)</Form.Label>
        <Form.Control
          type="number"
          value={imageHeight}
          onChange={(e) => setImageHeight(e.target.value)}
          onBlur={() => updateQuestion(question.name, "imageHeight", imageHeight)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Image Width (px)</Form.Label>
        <Form.Control
          type="number"
          value={imageWidth}
          onChange={(e) => setImageWidth(e.target.value)}
          onBlur={() => updateQuestion(question.name, "imageWidth", imageWidth)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Image Fit</Form.Label>
        <Form.Select
          className="shadow-none"
          onChange={(e) => {
            updateQuestion(question.name, "imageFit", e.target.value);
            setImageFit(e.target.value);
          }}
          value={imageFit}
        >
          <option>none</option>
          <option>contain</option>
          <option>cover</option>
          <option>fill</option>
        </Form.Select>
      </Form.Group>
      {image.src && <Image src={image.src} alt={image.alt} />}
      <Button className="qe__btn btn--blue qe__btn--img shadow-none" onClick={() => imageSelector.current.click()}>
        Add IMG
      </Button>
      <Button
        className="qe__btn btn--blue qe__btn--img shadow-none"
        onClick={async () => {
          const url = await uploadImage.handleUpload(
            setProgressBar,
            image,
            () => notify.successNotify("Successfully Uploaded!"),
            () => notify.errorNotify("Upload failed, please try again.")
          );
          updateQuestion(question.name, "imageLink", url);
        }}
        disabled={!image.src}
      >
        Upload
      </Button>
      <input
        type="file"
        onChange={(e) => {
          uploadImage.handleSelect(e, setImage);
        }}
        ref={imageSelector}
        accept="image/*"
      />
    </Form>
  );
};

ImageProp.propTypes = {
  question: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageHeight: PropTypes.number.isRequired,
    imageWidth: PropTypes.number.isRequired,
    imageFit: PropTypes.string.isRequired,
  }).isRequired,
  updateQuestion: PropTypes.func.isRequired,
  setProgressBar: PropTypes.func.isRequired,
};

export default ImageProp;
