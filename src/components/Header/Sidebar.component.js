import React from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";

const Sidebar = ({ isOpen, onClose }) => (
  <Drawer anchor="left" open={isOpen} onClose={onClose}>
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
