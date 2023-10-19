import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  adminAddProuct,
  editProuct,
} from "../../api-services/admin";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import Styles from "./FormAddProduct.module.css";
function FormAddProduct({ prod = false, handleClose }) {
  if (!prod) {
  }
  const admin = useSelector((data) => data.admin.admin);

  const queryClient = useQueryClient();
  const schma = yup.object().shape({
    name: yup.string().required().min(3).max(80),
    details: yup.string().required().min(3).max(1000),
    image: yup.string().required().min(3).max(1000),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: prod ? prod : "",
    resolver: yupResolver(schma),
  });
  const { mutate: addProd, isLoading } = useMutation({
    mutationFn: adminAddProuct,
  });
  const { mutate: editProd, isLoading: isEditing } =
    useMutation({
      mutationFn: editProuct,
    });

  const onSubmit = (value) => {
    console.log(value.image);
    if (prod) {
      let newCategory;

      if (value.category === "") {
        newCategory = oldCategory;
      } else {
        newCategory = value.category;
      }

      editProd(
        {
          ...value,

          category: newCategory,
          _id: prod._id,
        },
        {
          onSuccess: (data) => {
            toast.success("Product Edited Successfully");
            queryClient.invalidateQueries({
              queryKey: ["shop"],
            });
            handleClose();
          },
        }
      );
    } else {
      addProd(
        { ...value, creator: admin },
        {
          onSuccess: (data) => {
            if (data.error) {
              toast.error(data.error);
            } else {
              toast.success(
                "New product added successfully"
              );
            }

            queryClient.invalidateQueries({
              queryKey: ["shop"],
            });
            handleClose();
          },
          onError: (err) => {
            console.log(err);
          },
        }
      );
    }
  };

  return (
    <div className={Styles.modal}>
      <button className={Styles.btn} onClick={handleClose}>
        <CloseOutlinedIcon />
      </button>

      <form onSubmit={handleSubmit(onSubmit)}>
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
        {/* <input
        type="text"
        name="name"
        id="name"
        {...register("name")}
        />
      {errors.name && <span>{errors.name.message}</span>} */}
        <TextField
          type="text"
          label="Details"
          {...register("details")}
        />
        {errors.details && (
          <Typography variant="body1" color={"error"}>
            {errors.details.message}
          </Typography>
        )}

        <TextField
          type="text"
          label="Image Url"
          {...register("image")}
        />
        {errors.image && (
          <Typography variant="body1" color={"error"}>
            {errors.image.message}
          </Typography>
        )}

        <TextField
          type="number"
          label="Price"
          {...register("price")}
        />
        {errors.price && (
          <Typography variant="body1" color={"error"}>
            {errors.price.message}
          </Typography>
        )}
        {/* 
      <select
      {...register("category")}
      defaultValue={"none"}
      >
        <option value="none" hidden>
        Select a Category
        </option>

        <option value="clothing">Clothing & Apparel</option>
        <option value="footware">Footwear & Shoes</option>
        <option value="electronics">
          Electronics & Gadgets
        </option>
        <option value="furniture">Furniture</option>
      </select> */}
        {/* <FormControl> */}
        <InputLabel id="demo-simple-select-label">
          Category
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="category"
          defaultValue={"clothing"}
          {...register("category")}
        >
          <MenuItem value={"clothing"}>
            Clothing & Apparel
          </MenuItem>
          <MenuItem value={"footware"}>
            Footwear & Shoes
          </MenuItem>
          <MenuItem value={"electronics"}>
            Electronics & Gadgets
          </MenuItem>
          <MenuItem value={"furniture"}>Furniture</MenuItem>
        </Select>
        {/* </FormControl> */}

        <Button
          disabled={isLoading || isEditing}
          variant="contained"
          type="submit"
        >
          submit
        </Button>
      </form>
    </div>
  );
}

export default FormAddProduct;
