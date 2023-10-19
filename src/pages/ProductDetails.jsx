import { Skeleton, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Styles from "./ProductDetails.module.css";

function ProductDetails({ product }) {
  const param = useParams();
  let viewProduct;
  if (product) {
    viewProduct = product.find(
      (item) => item._id === param.id
    );
    console.log(viewProduct);
  }

  let data;
  if (product) {
    data = new Date(viewProduct.createdAt);
  }

  return (
    <div style={{ color: "#424242" }}>
      <Typography
        component={"h1"}
        variant="h4"
        align="center"
      >
        {viewProduct?.name}
      </Typography>
      <hr />
      <div className={Styles.container}>
        <div className={Styles.image}>
          <img
            style={{
              height: "200px",
              objectFit: "contain",
            }}
            src={viewProduct.image}
          />
        </div>
        <div className={Styles.content}>
          <Typography variant="subtitle1" component={"p"}>
            product was added on {data.toDateString()}
          </Typography>
          <Typography variant="subtitle1" component={"p"}>
            <span style={{ color: "#212121" }}>
              Product Category :
            </span>{" "}
            {viewProduct?.category}
          </Typography>
          <Typography>
            {" "}
            <span style={{ color: "#212121" }}>
              Details :
            </span>{" "}
            {viewProduct?.details}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
