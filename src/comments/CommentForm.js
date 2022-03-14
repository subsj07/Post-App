import React, { useState } from "react";
import Button from "@material-ui/core/Button";

export default function CommentForm({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  initialText = "",
  handleCancel,
}) {
  const [text, setText] = useState(initialText);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(text);
    setText("");
  };

  return (
    <div style={{ margin: "2%", width: "100%" }}>
      <form onSubmit={onSubmit}>
        <textarea
          rows="10"
          cols="80"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          {submitLabel}
        </Button>
        {hasCancelButton && (
          <Button
            variant="contained"
            color="default"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        )}
      </form>
    </div>
  );
}
