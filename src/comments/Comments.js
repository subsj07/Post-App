import React, { useEffect, useState } from "react";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  deleteComment as deleteCommentApi,
  updateComment as updateCommentApi,
} from "../api";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Comments({ currentUserId }) {
  const theme = createTheme();

  theme.typography.h3 = {
    fontSize: "1.2rem",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2rem",
    },
  };
  const [backendComments, setBackendComments] = useState([]);
  const [activeComments, setActiveComments] = useState(null);
  const rootComments = backendComments.filter(
    (backendComments) => backendComments.parentId === null
  );
  console.log("check backend comments", backendComments);

  const getReplies = (commentId) => {
    return backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };
  console.log("Replies Function", getReplies());

  const addComment = (text, parentId) => {
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComments(null);
    });
    console.log("add comment function", parentId);
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Do you want to delete comment ?")) {
      deleteCommentApi(commentId).then(() => {
        const updateBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updateBackendComments);
      });
    }
  };
  const updateComment = (text, commentId) => {
    updateCommentApi(text, commentId).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComments(null);
    });
  };

  useEffect(() => {
    getCommentsApi().then((data) => {
      setBackendComments(data);
    });
  }, []);

  return (
    <Paper style={{ margin: "2%", padding: "5%" }}>
      <ThemeProvider theme={theme}>
        <Typography variant="h3">Post For the Day....</Typography>
      </ThemeProvider>
      <CommentForm submitLabel="Post" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootcomment, index) => {
          return (
            <Comment
              key={rootcomment.id}
              comment={rootcomment}
              replise={getReplies(rootcomment.id)}
              currentUserId={currentUserId}
              deleteComment={deleteComment}
              activeComments={activeComments}
              setActiveComments={setActiveComments}
              addComment={addComment}
              updateComment={updateComment}
            />
          );
        })}
      </div>
      <ToastContainer />
    </Paper>
  );
}
