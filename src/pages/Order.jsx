import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getOrder } from "../api-services/user";
import { Button, Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { grey } from "@mui/material/colors";

function Order() {
  const navigate = useNavigate();
  const cart = useSelector((item) => item.cart);
  const total = cart.reduce(
    (acc, reducer) =>
      acc + reducer.product.price * reducer.quantity,
    0
  );

  // const total = array?.reduce(
  //   (acc, item) =>
  //   acc +
  //     item.items.reduce((acc, prod) => {
  //       return acc + prod.product.price * prod.quantity;
  //     }, 0),
  //   0
  // );

  console.log(cart);
  // const price = total.reduce(
  //   (acc, value) => acc + value.price * value.quan,
  //   0
  // );
  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
    >
      {cart.map((order) => (
        <div key={order.product._id}>
          <div
            style={{
              color: "#616161",
              display: "flex",
              flexWrap: "wrap",
              gap: "14px",
              padding: "24px",
            }}
          >
            <Typography component={"h1"} variant="h5">
              Name: {order.product.name}
            </Typography>
            <Typography component={"h1"} variant="h5">
              Price : {order.product.price} $
            </Typography>
            <Typography component={"h1"} variant="h5">
              Quantity : {order.quantity}
            </Typography>
          </div>
        </div>
      ))}
      <hr />

      <Typography
        component={"h1"}
        variant="h5"
        align="center"
        color={grey[700]}
      >
        Total Price : {total} $
      </Typography>

      <hr />
      <div
        style={{
          display: "flex",
          gap: "4px",
          justifyContent: "center",
        }}
      >
        <Button variant="contained">Pay Now</Button>
        <Button
          variant="outlined"
          onClick={() => {
            toast.success("Thank you we will contact soon");
            navigate("/");
          }}
        >
          Pay on Delivery
        </Button>
      </div>
    </div>
  );
}

export default Order;

//
// <hr />
// <div>
//   {" "}
//   <Typography
//     variant="h4"
//     align="center"
//     component={"h2"}
//     sx={{ color: "#616161" }}
//   >
//     Total cost of order :{total} $
//   </Typography>
// </div>
// <hr />
//       alignSelf: "center",
//       display: "flex",
//       gap: "8px",
//     }}
//   >
// )}
// {data?.error && (
//   <Typography
//     variant="h3"
//     align="center"
//     sx={{ color: "#616161" }}
//   >
//     {data?.error.toUpperCase()}
//   </Typography>
