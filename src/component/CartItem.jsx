import React from "react";
import { useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
} from "../features/cart-slice";
import { Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Styles from "./CartItem.module.css";

function CartItem({ cart }) {
  const { product } = cart;
  const dispatch = useDispatch();

  return (
    <>
      <div className={Styles.container}>
        <img
          id={product._id}
          style={{
            height: "100px",
            width: "100px",
            objectFit: "contain",
          }}
          src={product.image}
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.3rem",
          }}
        >
          <Typography
            variant="h5"
            component={"h2"}
            sx={{ color: grey[700] }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="h5"
            component={"p"}
            sx={{ color: grey[700] }}
          >
            {product.price} $
          </Typography>
          <div className={Styles.btn}>
            <Button
              type="primary"
              variant="contained"
              onClick={() => {
                dispatch(addToCart(product));
              }}
              disableElevation
            >
              + Add
            </Button>
            <Typography
              variant="h5"
              component={"span"}
              sx={{ color: grey[700] }}
              align="center"
            >
              {cart.quantity}
            </Typography>
            <Button
              disableElevation
              variant="outlined"
              onClick={() => {
                dispatch(removeFromCart(product._id));
              }}
            >
              - Remove
            </Button>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default CartItem;
