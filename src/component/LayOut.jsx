import {
  AppBar,
  Badge,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Styles from "./Layout.module.css";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";
function LayOut() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  
  const cart = useSelector((item) => item.cart);
  //calculate no of items in cart

  const noOfItems = cart.reduce(
    (acc, reducer) => acc + reducer.quantity,
    0
  );
  // checking if the user is logged in or not 

  useEffect(() => {
    const data = localStorage.getItem("token");
    if (data) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });
  //state for mobile navbar
  const [isClosed, setIsClosed] = useState(true);
  return (
    <Box component="div">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" sx={{ top: 0 }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <LocalMallIcon
                sx={{
                  display: { xs: "flex", md: "flex" },
                  mr: 1,
                }}
              />
              <span className={Styles.link}>
                <Typography
                  variant="h6"
                  noWrap
                  component="h1"
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <NavLink to="/" end>
                    E-Shop
                  </NavLink>
                </Typography>
              </span>
              <span className={Styles.icon}>
                {isClosed && (
                  <button
                    onClick={() => {
                      setIsClosed(false);
                    }}
                  >
                    <MenuIcon />
                  </button>
                )}
                {!isClosed && (
                  <button
                    onClick={() => {
                      setIsClosed(true);
                    }}
                  >
                    <CloseIcon />
                  </button>
                )}
              </span>
              <nav
                className={`${Styles.navlink} ${
                  !isClosed ? Styles.open : ""
                }`}
              >
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? Styles.active : ""
                  }
                  onClick={() => {
                    setIsClosed(true);
                  }}
                  end
                >
                  <IconButton
                    size="medium"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <HomeIcon fontSize="1rem" />
                    <span>Home</span>
                  </IconButton>
                </NavLink>

                <NavLink
                  to="cart"
                  className={({ isActive }) =>
                    isActive ? Styles.active : ""
                  }
                  onClick={() => {
                    setIsClosed(true);
                  }}
                  end
                >
                  <IconButton
                    size="medium"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge
                      badgeContent={noOfItems}
                      color="error"
                    >
                      <ShoppingCartOutlinedIcon />
                    </Badge>
                    <span>Cart</span>
                  </IconButton>
                </NavLink>

                {/* <NavLink
                  to={
                    localStorage.getItem("token")
                      ? "/user/signup"
                      : "user/order"
                  }
                  className={({ isActive }) =>
                    isActive ? Styles.active : ""
                  }
                  end
                >
                Order
              </NavLink> */}
                {!isLogin && (
                  <NavLink
                    to="user/signup"
                    className={({ isActive }) =>
                      isActive ? Styles.active : ""
                    }
                    onClick={() => {
                      setIsClosed(true);
                    }}
                    end
                  >
                    Login
                  </NavLink>
                )}
                {isLogin && (
                  <NavLink
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/");
                    }}
                  >
                    Logout
                  </NavLink>
                )}

                <NavLink
                  to={isLogin ? "user" : "/user/signup"}
                  className={({ isActive }) =>
                    isActive ? Styles.active : ""
                  }
                  end
                >
                  User
                </NavLink>

                <NavLink
                  to={
                    localStorage.getItem("token_admin")
                      ? "admin/shop"
                      : "admin/signup"
                  }
                  className={({ isActive }) =>
                    isActive ? Styles.active : ""
                  }
                  onClick={() => {
                    setIsClosed(true);
                  }}
                  end
                >
                  Admin
                </NavLink>
              </nav>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <main>
        <Outlet />
      </main>
    </Box>
  );
}

export default LayOut;
