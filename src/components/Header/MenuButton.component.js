import React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const MenuButton = ({ onClick }) => (
  <IconButton
    edge="start"
    color="inherit"
    aria-label="menu"
    sx={{ marginRight: 2 }}
    onClick={onClick}
  >
    <MenuIcon />
  </IconButton>
);

export default MenuButton;
