import React, { useState } from "react";
import Button from "./ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart-slice";
import { useNavigate } from "react-router-dom";
import {
  Skeleton,
  Typography,
} from "@mui/material";
import Styles from "./Product.module.css";
import { toast } from "react-hot-toast";

function Product({ products = [] }) {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <ul className={Styles.grid}>
      {products.map((prod, i) => (
        <li key={prod._id} style={{ listStyle: "none" }}>
          <div className={Styles.card}>
            <div className={Styles.image}>
              <img
                id={prod._id}
                style={{
                  width: "14rem",
                  height: "8.8rem",
                  display: load ? "bloack" : "hidden",
                  objectFit: "contain",
                }}
                src={prod.image}
                onLoad={() => {
                  setLoad(true);
                }}
                
              />

              {!load && (
                <Skeleton
                  animation={"wave"}
                  component={"img"}
                  variant="rectangular"
                  width={224}
                  height={130}
                />
              )}
            </div>
            <div className={Styles.content}>
              <Typography component={"h2"} variant="h6">
                {prod.name}
              </Typography>

              <Typography
                component={"p"}
                variant="subtitle1"
              >
                Price:{prod.price}$
              </Typography>

              <div className={Styles.btn}>
                <Button
                  btn={"prim"}
                  link={prod._id}
                  isDetails={true}
                >
                  See Details
                </Button>
                <Button
                  btn={"sec"}
                  isDetails={false}
                  onClick={() => {
                    if (!localStorage.getItem("token")) {
                      // redirect("/user/login");
                      return navigate("/user/signup");
                    }

                    dispatch(addToCart(prod));
                    toast.success("Item added to Cart");
                  }}
                >
                  Add To Cart
                </Button>
              </div>
              <hr />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Product;
