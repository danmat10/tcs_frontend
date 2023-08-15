import React from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BuildIcon from "@mui/icons-material/Build";
import BarChartIcon from "@mui/icons-material/BarChart";
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
      sx: { width: "256px", top: "64px" },
    }}
    slotProps={{ backdrop: { invisible: true } }}
  >
    <Toolbar>
      <Typography variant="h6">Sidebar Menu</Typography>
    </Toolbar>
    <Divider />
    <List>
      <ListItem component={Link} to="/users">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Usuários" />
      </ListItem>
      <ListItem component={Link} to="/">
        <ListItemIcon>
          <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText primary="Patrimônio" />
      </ListItem>
      <ListItem component={Link} to="/">
        <ListItemIcon>
          <BusinessCenterIcon />
        </ListItemIcon>
        <ListItemText primary="Departamentos" />
      </ListItem>
      <ListItem component={Link} to="/">
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Requisições" />
      </ListItem>
      <ListItem component={Link} to="/">
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText primary="Manutenções" />
      </ListItem>
      <ListItem component={Link} to="/">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Gestão" />
      </ListItem>
    </List>
  </Drawer >
);

export default Sidebar;
