import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const UserMenu = ({ anchorEl, onClose, onEditProfile, onLogout }) => (
  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
    <MenuItem onClick={onEditProfile}>Editar Perfil</MenuItem>
    <MenuItem onClick={onLogout}>Logout</MenuItem>
  </Menu>
);

export default UserMenu;
