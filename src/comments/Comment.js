import React from "react";
// import { updateComment } from "../api";
import CommentForm from "./CommentForm";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Comment({
  comment,
  replise,
  currentUserId,
  deleteComment,
  activeComments,
  setActiveComments,
  parentId = null,
  addComment,
  updateComment,
}) {
  console.log(replise);
  console.log(replise.length);
  const classes = useStyles();

  const canReplay = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId;
  const canDelete = currentUserId === comment.userId;
  const isReplying =
    activeComments &&
    activeComments.type === "replying" &&
    activeComments.id === comment.id;
  const isEditing =
    activeComments &&
    activeComments.type === "editing" &&
    activeComments.id === comment.id;
  const replyId = parentId ? parentId : comment.id;

  return (
    <div className="comment">
      <div>
        <div className="comment-content"></div>
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => {
              updateComment(text, comment.id);
              console.log(text);
            }}
            handleCancel={() => {
              setActiveComments(null);
            }}
          />
        )}
        <div className="comment-actions">
          {canReplay && (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<SendIcon />}
              onClick={() => {
                setActiveComments({ id: comment.id, type: "replying" });
              }}
            >
              Reply
            </Button>
          )}
          {canEdit && (
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<CloudUploadIcon />}
              onClick={() => {
                setActiveComments({ id: comment.id, type: "editing" });
              }}
            >
              Edit
            </Button>
          )}
          {canDelete && (
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={() => {
                deleteComment(comment.id);
              }}
            >
              Delete
            </Button>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => {
              addComment(text, replyId);
            }}
          />
        )}
        {replise.length > 0 && (
          <div className="replies">
            {replise.map((reply) => {
              return (
                <Comment
                  comment={reply}
                  key={reply.id}
                  replise={[]}
                  currentUserId={currentUserId}
                  parentId={comment.id}
                  addComment={addComment}
                  activeComments={activeComments}
                  setActiveComments={setActiveComments}
                  updateComment={updateComment}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
