import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import PropTypes from "prop-types";

const HTML = ({ question, updateQuestion }) => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    setHtml(question.html);
  }, []);

  return (
    <div className="ck-container">
      <CKEditor
        editor={ClassicEditor}
        data={html}
        config={{
          toolbar: ["heading", "bold", "italic", "bulletedList", "numberedList", "undo", "redo", "indent", "outdent"],
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setHtml(data);
        }}
        onBlur={() => {
          updateQuestion(question.name, "html", html);
        }}
      />
    </div>
  );
};

HTML.propTypes = {
  question: PropTypes.shape({
    name: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired,
  }).isRequired,
  updateQuestion: PropTypes.func.isRequired,
};

export default HTML;
