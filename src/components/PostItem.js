import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Collapse,
  IconButton,
} from "@mui/material";
import CommentIcon from "../assets/icons/CommentIcon";
import EditIcon from "../assets/icons/EditIcon";
import DeleteIcon from "../assets/icons/DeleteIcon";

function PostItem({ postItem, delHandler, editHandler }) {
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleExpandClick = async () => {
    setLoading(true);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postItem?.id}/comments`
    );
    const allcomments = await response.json();
    setComments(allcomments);
    setLoading(false);

    console.log(allcomments);
  };

  const deletePost = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postItem?.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Delete successful");
        delHandler(postItem?.id);
        setLoading(false);
      } else {
        console.error("Error:", response.status);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            {/* <MoreVertIcon /> */}
          </IconButton>
        }
        title={`${postItem?.title}`}
      />

      <CardContent>
        <p variant="body2" color="text.secondary">
          {postItem?.body}
        </p>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
        disableSpacing
      >
        <div
          style={{
            cursor: "pointer",
          }}
          expand={expanded}
          onClick={() => {
            setExpanded(!expanded);
            handleExpandClick();
          }}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon stroke={"#333"} />
        </div>
        <div
          style={{
            cursor: "pointer",
          }}
          expand={expanded}
          onClick={() => {
            editHandler(postItem);
          }}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <EditIcon stroke={"#333"} />
        </div>
        {showConfirmation ? (
          <div
            style={{
              cursor: "pointer",
              background: "red ",
              padding: "12px 24px",
              color: "white",
            }}
            expand={expanded}
            onClick={() => {
              setShowConfirmation(!showConfirmation);
              deletePost();
            }}
            aria-expanded={expanded}
            aria-label="show more"
          >
            Are you sure
          </div>
        ) : (
          <div
            style={{
              cursor: "pointer",
            }}
            expand={expanded}
            onClick={() => {
              setShowConfirmation(!showConfirmation);
            }}
            aria-expanded={expanded}
            aria-label="show more"
          >
            {loading ? <CircularProgress /> : <DeleteIcon stroke={"#333"} />}
          </div>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {loading ? (
            <CircularProgress />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "32px",
              }}
            >
              {comments?.map((item) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        margin: "0",
                      }}
                    >
                      {" "}
                      {item?.name}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        margin: "0",
                      }}
                    >
                      {" "}
                      {item?.email}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        margin: "12px 0 0 0",
                      }}
                    >
                      {item?.body}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default PostItem;
