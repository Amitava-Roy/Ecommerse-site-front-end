import React, { useRef, useState } from "react";
import FormAddProduct from "./FormAddProduct";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { postDeletProduct } from "../../api-services/admin";
import { useSelector } from "react-redux";
import Styles from "../Product.module.css";
import {
  Box,
  Button,
  Modal,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import array, { baseUrl } from "../../data/image";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};
function ViewAdminProducts({ prod }) {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const adminId = useSelector((item) => item.admin.admin);
  let showEditAndDelet;
  if (prod.creator !== adminId) {
    showEditAndDelet = false;
  } else {
    showEditAndDelet = true;
  }
  const qureyClient = useQueryClient();
  const [show, setShow] = useState(false);

  //delet product 
  const { mutate: deletProduct, isLoading } = useMutation({
    mutationFn: postDeletProduct,
  });
  function handleDeletProduct() {
    deletProduct(
      {
        _id: prod._id,
        image: prod.image,
        creator: prod.creator,
      },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          toast.success(data.message);
          qureyClient.invalidateQueries({
            queryKey: ["shop"],
          });
        },
      }
    );
  }

  const viewProd = array.find(
    (item) => item.id === prod._id
  );
  return (
    <div className={Styles.card}>
      <div
        className={Styles.image}
        // style={{
        //   width: "14rem",
        //   height: "10rem",
        //   objectFit: "contain",
        // }}
      >
        <img
          id={prod._id}
          style={{
            width: "14rem",
            height: "10rem",
            objectFit: "contain",
          }}
          src={prod.image}
          // onError={() => {
          //   console.log(prod.image);
          //   document.getElementById(prod._id).src =
          //     viewProd?.img;
          // }}
        />
      </div>

      <div className={Styles.content}>
        <Typography component={"h2"} variant="h6">
          {prod.name}
        </Typography>

        <Typography component={"p"} variant="subtitle1">
          Price:{prod.price}$
        </Typography>

        <div
          style={{
            display: "flex",
            gap: "4px",
            paddingBottom: "2px",
          }}
        >
          <Button
            disableElevation
            disabled={!showEditAndDelet}
            startIcon={<EditIcon />}
            variant="contained"
            onClick={handleOpen}
          >
            Edit
          </Button>

          <Button
            disableElevation
            disabled={!showEditAndDelet || isLoading}
            startIcon={<DeleteIcon />}
            variant="outlined"
            onClick={handleDeletProduct}
          >
            Delet
          </Button>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <FormAddProduct
              prod={prod}
              handleClose={handleClose}
            />
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default ViewAdminProducts;
