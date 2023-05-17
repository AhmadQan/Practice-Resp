import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import { TextField } from "@mui/material";

function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    console.log(data);
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    const matchedUser = users.find(
      (user) => user.email === data?.email && user.phone === data?.phone
    );

    if (matchedUser) {
      const currentTime = new Date().getTime();

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", matchedUser.username);
      localStorage.setItem("userId", matchedUser.id);
      localStorage.setItem("lastLoginTime", currentTime.toString());

      navigate("/posts");
    } else {
      setApiError("User does not exist");
    }
  };

  console.log(errors);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/posts");
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",

        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        background: "#F3F2EF",
      }}
    >
      <form
        onSubmit={handleSubmit(submitHandler)}
        style={{
          width: "24%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
          borderRadius: "12px",
          gap: "3.2rem",
          padding: "3.2rem 1.2rem",
          border: "1px solid #ffff",
          backgroundColor: "#ffff",
        }}
      >
        <h2
          style={{
            color: "#4768ED",
            fontWeight: "900",
            fontSize: "32px",
          }}
        >
          Start your journy here{" "}
        </h2>
        <div
          style={{
            width: "100%",
          }}
        >
          <TextField
            fullWidth
            id="outlined-uncontrolled"
            label="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
          />
          {errors?.email && (
            <p
              style={{
                color: "red",
              }}
            >
              Please Enter a valid email
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
            label="phone"
            {...register("phone", {
              required: "phone is required",
            })}
          />
          {errors?.phone && (
            <p
              style={{
                color: "red",
              }}
            >
              Please Enter a valid email
            </p>
          )}
          {apiError && (
            <p
              style={{
                color: "red",
              }}
            >
              {apiError}
            </p>
          )}
        </div>
        <button
          style={{
            width: "100%",
            aspectRatio: "8/1",
            background: "#4768ED",
            fontWeight: "700",
            color: "white",
            fontSize: "24px",
            border: "none",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
