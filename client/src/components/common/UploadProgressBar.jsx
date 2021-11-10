import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import PropTypes from "prop-types";

const UploadProgressBar = ({ progressBar }) => {
  const { visible, progress } = progressBar;

  return <div>{visible && <ProgressBar className="progress-bar" now={progress} />}</div>;
};

export default UploadProgressBar;

UploadProgressBar.propTypes = {
  progressBar: PropTypes.shape({
    visible: PropTypes.bool.isRequired,
    progress: PropTypes.number.isRequired,
  }).isRequired,
};
