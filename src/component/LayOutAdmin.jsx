import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Styles from "./Layout.module.css";

function LayOutAdmin() {
  const [isClosed, setIsClosed] = useState(true);

  const navigate = useNavigate();
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
                    E-shop
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
                  Home
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

                <NavLink
                  to={"/"}
                  onClick={() => {
                    localStorage.removeItem("token_admin");
                  }}
                  style={{ marginLeft: "20px" }}
                >
                  Logout
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

export default LayOutAdmin;
