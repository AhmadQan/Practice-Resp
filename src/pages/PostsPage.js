import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostItem from "../components/PostItem";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

function PostsPage() {
  const [toBeEdited, setToBeEdited] = useState(null);
  console.log(toBeEdited);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({});
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setToBeEdited(null);
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const [allPosts, setAllPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();
    setAllPosts(posts);
  };

  const submitHandler = async (data) => {
    setLoading(true);
    const userId = localStorage.getItem("userId");

    if (toBeEdited) {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${toBeEdited?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, userId: userId }),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log("Response:", responseData);
        //   fetchPosts();
        setAllPosts((prev) => {
          return [{ userId: userId, ...data }, ...prev];
        });
        setLoading(false);
      } else {
        console.error("Error:", response.status);
        setLoading(false);
      }
    } else {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, userId: userId }),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log("Response:", responseData);
        //   fetchPosts();
        setAllPosts((prev) => {
          return [{ userId: userId, ...data }, ...prev];
        });
        setLoading(false);
      } else {
        console.error("Error:", response.status);
        setLoading(false);
      }
    }
  };

  const deleteFromLs = (id) => {
    const newLs = allPosts?.filter((post) => {
      return post?.id !== id;
    });

    setAllPosts(newLs);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }

    if (!allPosts) {
      fetchPosts();
    }
  }, [allPosts]);

  console.log(allPosts);

  return (
    <section
      style={{
        background: "#F3F2EF",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "18.6/1",
          background: "#ffff",
          boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 28px ",
          boxSizing: "border-box",
        }}
      >
        <p
          style={{
            color: "#4768ED",
            fontSize: "24px",
            fontWeight: "800",
          }}
        >
          LOGO
        </p>
        <div
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("username");
            localStorage.removeItem("lastLoginTime");

            navigate("/");
          }}
          style={{
            color: "#333",
            fontSize: "18px",
            fontWeight: "800",
            cursor: "pointer",
          }}
        >
          Log Out
        </div>
      </div>
      <div
        style={{
          width: "100%",
          padding: "32px 12.4rem",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            padding: "48px 0",
          }}
        >
          <p
            style={{
              fontSize: "32px",
              fontWeight: "800",
              color: "#333",
            }}
          >
            ADD YOUR POST FOR THE WORLD TO SEE
          </p>
          <button
            onClick={() => {
              handleClickOpen();
            }}
            style={{
              width: "12vw",
              aspectRatio: "4/1",
              background: "#4768ED",
              color: "#fff",
              border: "none",
              fontWeight: "800",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Add Now
          </button>
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <div
            style={{
              display: "grid",
              width: "100%",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "18px",
              justifyContent: "center",
              alignItems: "start",
            }}
          >
            {allPosts?.map((postItem) => {
              return (
                <PostItem
                  editHandler={(data) => {
                    setToBeEdited(data);
                    handleClickOpen();
                  }}
                  delHandler={deleteFromLs}
                  postItem={postItem}
                />
              );
            })}
          </div>
        )}

        <Dialog sx={{}} open={open} onClose={handleClose}>
          <DialogTitle>{toBeEdited ? "Edit Post" : "Add Post"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {toBeEdited
                ? "To Edit post please fill all the below fields"
                : " To Add new post please fill all the below fields"}
            </DialogContentText>
            <form
              onSubmit={handleSubmit(submitHandler)}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "12px",
                gap: "3.2rem",
              }}
            >
              <div
                style={{
                  width: "100%",
                }}
              >
                <TextField
                  fullWidth
                  id="outlined-uncontrolled"
                  label="title"
                  {...register("title", {
                    required: "title is required",
                  })}
                />
                {errors?.title && (
                  <p
                    style={{
                      color: "red",
                    }}
                  >
                    Please Enter a title
                  </p>
                )}
              </div>
              <div
                style={{
                  width: "100%",
                }}
              >
                <TextField
                  fullWidth
                  id="outlined-uncontrolled"
                  label="body"
                  {...register("body", {
                    required: "body is required",
                  })}
                />
                {errors?.body && (
                  <p
                    style={{
                      color: "red",
                    }}
                  >
                    Please Enter a body
                  </p>
                )}
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  aspectRatio: "8/1",
                  background: "#4768ED",
                  fontWeight: "700",
                  color: "white",
                  fontSize: "24px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ADD
              </button>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </section>
  );
}

export default PostsPage;
