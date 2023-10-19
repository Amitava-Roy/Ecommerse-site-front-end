import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  loginUser,
  signupUser,
} from "../../api-services/user";
import { useMutation } from "@tanstack/react-query";
import {
  loginAdmin,
  signupAdmin,
} from "../../api-services/admin";
import {
  Button,
  TextField,
  Typography,
} from "@mui/material";
import Styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Form({ state, setState }) {
  const navigate = useNavigate();
  const schma = yup.object().shape({
    name: yup.string().required().min(3).max(18),
    password: yup
      .string()
      .min(3)
      .max(32)
      .required("Please enter valid password"),
    email: yup
      .string()
      .trim()
      .email()
      .min(3)
      .max(30)
      .required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schma),
  });
  const { mutate: createUser, isLoading: isCreating } =
    useMutation({
      mutationFn: signupUser,
    });
  const { mutate: login, isLoading: isLogging } =
    useMutation({
      mutationFn: loginUser,
    });

  function handleDemoUser() {
    login(
      {
        name: "Amitava Roy",
        email: "exami@good.com",
        password: "123456",
      },
      {
        onSuccess: (data) => {
          localStorage.setItem("token", data.token_user);
          if (!data.error) {
            reset();
            navigate("/");
          } else toast.error(`${data.error}`);
        },
        onError: (err) => console.log(err),
      }
    );
  }

  const onSubmit = (value) => {
    ////////USER/////////////
    if (state === "signup") {
      createUser(value, {
        onSuccess: (data) => {
          if (data.error) {
            toast.error(`${data.error}`);
            reset();
          } else {
            setState("login");
            navigate("/user/signup");
          }
        },
        onError: (err) => console.log(err),
      });
    }
    if (state === "login") {
      const logged = localStorage.getItem("token");

      login(value, {
        onSuccess: (data) => {
          localStorage.setItem("token", data.token_user);
          if (!data.error) {
            reset();
            navigate("/");
          } else toast.error(`${data.error}`);
        },
        onError: (err) => console.log(err),
      });
    }
  };

  return (
    <div className={Styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <label htmlFor="name">Name</label>
      <input
      type="text"
      name="name"
        id="name"
        {...register("name")}
      /> */}
        <div>
          <TextField
            type="text"
            label="Name"
            {...register("name")}
          />
          {errors.name && (
            <Typography variant="body1" color={"error"}>
              {errors.name.message}
            </Typography>
          )}
        </div>
        {/* <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        {...register("email")}
      /> */}
        <div>
          <TextField
            type="email"
            label="email"
            {...register("email")}
          />
          {errors.email && (
            <Typography variant="body1" color={"error"}>
              {errors.email.message}
            </Typography>
          )}
        </div>

        {/* <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        {...register("password")}
      /> */}
        <div>
          <TextField
            type="password"
            label="password"
            {...register("password")}
          />
          {errors.password && (
            <Typography variant="body1" color={"error"}>
              {errors.password.message}
            </Typography>
          )}
        </div>

        <Button
          variant="contained"
          size="large"
          disableElevation
          type="submit"
          disabled={isCreating || isLogging}
        >
          {state}
        </Button>
      </form>
      <Button
        onClick={handleDemoUser}
        variant="outlined"
        sx={{ mt: "10px" }}
        size="large"
        disableElevation
        type="button"
        disabled={isCreating || isLogging}
      >
        Demo User Login
      </Button>
    </div>
  );
}

export default Form;
