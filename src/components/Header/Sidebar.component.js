import React from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { ReactComponent as Logo } from "../assets/icons/logo.svg";

const Sidebar = ({ isOpen, onClose }) => (
  <Drawer
    anchor="left"
    open={isOpen}
    onClose={onClose}
    PaperProps={{
      sx: { width: "256px" },
    }}
  >
    <Toolbar>
      <Logo style={{ width: "76px" }} />
      <Typography variant="h6">Sidebar Menu</Typography>
    </Toolbar>
    <Divider />
    <List>
      <ListItem component={Link} to="/users">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
    </List>
  </Drawer>
);

export default Sidebar;
