import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton } from "@mui/material";

import { useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Navbar = () => {
  const location = useLocation();
  const isDashboard = location.pathname.includes("/dashboard/");
  const campaignName = location.state?.campaignName;
  return (
    <AppBar position="static">
      <Toolbar>
        {isDashboard ? (
          <Link
            to="/"
            style={{
              color: campaignName,
              textDecoration: "none",
            }}
          >
            <IconButton edge="start" color="inherit" aria-label="menu">
              <ArrowBackIcon />
            </IconButton>
          </Link>
        ) : (
          <Link
            to="/"
            style={{ backgroundColor: "white", textDecoration: "none" }}
          ></Link>
        )}
      </Toolbar>
    </AppBar>
  );
};
