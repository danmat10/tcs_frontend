import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ExitToApp from "@mui/icons-material/ExitToApp";

const UserMenu = ({ anchorEl, onClose, onEditProfile, onLogout }) => (
  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
    <MenuItem onClick={onEditProfile}>
      <ListItemIcon>
        <AccountCircle fontSize="small" />
      </ListItemIcon>
      <Typography variant="inherit">Perfil</Typography>
    </MenuItem>
    <MenuItem onClick={onLogout}>
      <ListItemIcon>
        <ExitToApp fontSize="small" />
      </ListItemIcon>
      <Typography variant="inherit">Logout</Typography>
    </MenuItem>
  </Menu>
);

export default UserMenu;
