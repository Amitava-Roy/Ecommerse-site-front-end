import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useMutation } from "@tanstack/react-query";
import {
  loginAdmin,
  signupAdmin,
} from "../../api-services/admin";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAdmin } from "../../features/admin-slice";
import Styles from "./Form.module.css";
import {
  Button,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";

function FormAdmin({ state }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //yup schema
  const schma = yup.object().shape({
    name: yup.string().required().min(3).max(12),
    password: yup.string().min(3).max(32).required(),
    email: yup
      .string()
      .trim()
      .email()
      .min(3)
      .max(40)
      .required(),
  });
  //react hook form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schma),
  });
  // tenstack query for data mutation
  const { mutate: createAdmin, isLoading: isCreating } =
    useMutation({
      mutationFn: signupAdmin,
    });
  // tenstack query for data mutation
  const { mutate: loginAsAdmin, isLoading: isLogging } =
    useMutation({
      mutationFn: loginAdmin,
    });

  function handleDemoLogin() {
    loginAsAdmin(
      {
        name: "shoe",
        email: "shoe@shoe.com",
        password: "1234",
      },
      {
        onSuccess: (data) => {
          if (data?.error) {
            return toast.error(`${data.error}`);
          } else {
            toast.success("logged in");
          }
          localStorage.setItem("token_admin", data.token);
          dispatch(addAdmin(data.admin));
          navigate("/admin/shop");
        },
        onError: (err) => console.log(err),
      }
    );
  }

  const onSubmit = (value) => {
    ////////USER/////////////
    if (state === "signup") {
      createAdmin(value, {
        onSuccess: (err) => {
          if (err.error) {
            toast.error(err.error);
          } else {
            toast.success("siggned up please login");
          }
        },
        onError: (err) => console.log(err),
      });
    }
    if (state === "login") {
      const logged = localStorage.getItem("token_admin");

      loginAsAdmin(value, {
        onSuccess: (data) => {
          if (data?.error) {
            return toast.error(`${data.error}`);
          } else {
            toast.success("logged in");
          }
          localStorage.setItem("token_admin", data.token);
          dispatch(addAdmin(data.admin));
          navigate("/admin/shop");
        },
        onError: (err) => console.log(err),
      });
    }
  };

  return (
    <div className={Styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          disabled={isLogging || isCreating}
        >
          {state}
        </Button>
      </form>
      <Button
        onClick={handleDemoLogin}
        variant="outlined"
        size="large"
        sx={{ mt: "10px" }}
        disableElevation
        type="button"
        disabled={isLogging || isCreating}
      >
        Demo user
      </Button>
    </div>

    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <label htmlFor="name">Name</label>
    //   <input
    //     type="text"
    //     name="name"
    //     id="name"
    //     {...register("name")}
    //   />
    //   {errors.name && <span>{errors.name.message}</span>}
    //   <label htmlFor="email">Email</label>
    //   <input
    //     type="email"
    //     name="email"
    //     id="email"
    //     {...register("email")}
    //   />
    //   {errors.email && <span>{errors.email.message}</span>}

    //   <label htmlFor="password">Password</label>
    //   <input
    //     type="password"
    //     name="password"
    //     id="password"
    //     {...register("password")}
    //   />
    //   {errors.password && (
    //     <span>{errors.password.message}</span>
    //   )}

    //   <button type="submit">{state} </button>
    // </form>
  );
}

export default FormAdmin;
