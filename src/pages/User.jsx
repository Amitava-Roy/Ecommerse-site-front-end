import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getOrder, infoUser } from "../api-services/user";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Spinner from "./Spinner";

function User() {
  // data fetching
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({ queryFn: infoUser, queryKey: ["user"] });
  const { data, isLoading, isError } = useQuery({
    queryFn: getOrder,

    queryKey: ["order"],
  });
  //Early return if no user is found when not logged in
  if (isError) {
    return <p>try loging in</p>;
  }
  const array = data?.orders;

  return (
    <>
      <div>
        <Typography align="center" variant="h5">
          {userData?.name}
        </Typography>
        <Typography align="center" variant="h5">
          {userData?.email}
        </Typography>
      </div>
      {isLoading && <Spinner />}
      <div>
        <Typography
          sx={{ marginLeft: "24px" }}
          variant="h5"
        >
          Previous Orders:
        </Typography>
        {!data?.error &&
          array?.map((order, i) => (
            <div key={order._id}>
              {order?.items?.map((prod) => (
                <div key={prod._id}>
                  <div
                    style={{
                      color: "#616161",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "14px",
                      padding: "24px",
                    }}
                  >
                    <Typography
                      component={"h1"}
                      variant="h5"
                    >
                      Name: {prod.product.name}
                    </Typography>
                    <Typography
                      component={"h1"}
                      variant="h5"
                    >
                      Price : {prod.product.price} $
                    </Typography>
                    <Typography
                      component={"h1"}
                      variant="h5"
                    >
                      Quantity : {prod.quantity}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </>
  );
}

export default User;
