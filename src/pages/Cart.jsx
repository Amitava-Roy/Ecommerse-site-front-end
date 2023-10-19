import React from "react";
import CartItem from "../component/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart-slice";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../api-services/user";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { WidthFull } from "@mui/icons-material";

function Cart() {
  const cart = useSelector((item) => item.cart);

  const isEmpty = cart.length === 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: createOrder,
  });

  return (
    <>
      {isEmpty && (
        <Typography
          variant="h3"
          component={"h1"}
          align="center"
          sx={{ color: grey[700] }}
        >
          Cart is Empty add some item
        </Typography>
      )}
      {cart.map((item) => {
        return (
          <CartItem key={item.product._id} cart={item} />
        );
      })}

      {!isEmpty && (
        <div
          style={{
            padding: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <Button
            size="large"
            startIcon={<DeleteIcon />}
            disableElevation
            variant="outlined"
            onClick={() => {
              dispatch(clearCart());
              console.log(cart);
            }}
          >
            Clear Cart
          </Button>
          <Button
            disabled={isLoading}
            size="large"
            disableElevation
            endIcon={<SendIcon />}
            variant="contained"
            onClick={() => {
              mutate(cart, {
                onSuccess: (data) => {
                  navigate("/user/order");
                },
              });
            }}
          >
            Order Now
          </Button>
        </div>
      )}
    </>
  );
}

export default Cart;
