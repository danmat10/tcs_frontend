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

import { ReactComponent as Logo } from "assets/icons/logo azul.svg";
import { URLS } from "routes";

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
      <Logo width="85px" height="67px" />
      <Typography variant="h6">Nome do App</Typography>
    </Toolbar>
    <Divider />
    <List>
      <ListItem component={Link} to={URLS.USUARIO}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Usuários" />
      </ListItem>
      <ListItem component={Link} to={URLS.PATRIMONIO}>
        <ListItemIcon>
          <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText primary="Patrimônio" />
      </ListItem>
      <ListItem component={Link} to={URLS.DEPARTAMENTO}>
        <ListItemIcon>
          <BusinessCenterIcon />
        </ListItemIcon>
        <ListItemText primary="Departamentos" />
      </ListItem>
      <ListItem component={Link} to={URLS.REQUISICAO}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Requisições" />
      </ListItem>
      <ListItem component={Link} to={URLS.MANUTENCAO}>
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText primary="Manutenções" />
      </ListItem>
      <ListItem component={Link} to={URLS.GESTAO}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Gestão" />
      </ListItem>
    </List>
  </Drawer>
);

export default Sidebar;
