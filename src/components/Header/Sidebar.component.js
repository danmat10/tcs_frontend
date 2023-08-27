import React from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
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
import { URLS } from "config";

const Sidebar = ({ isOpen, onClose }) => (
  <Drawer
    anchor="left"
    open={isOpen}
    onClose={onClose}
    PaperProps={{
      sx: {
        width: { xs: "100%", sm: "256px" },
        top: { xs: "56px", sm: "64px" },
        alignItems: { xs: "center", sm: "flex-start" },
      },
    }}
    slotProps={{ backdrop: { invisible: true } }}
  >
    <Toolbar>
      <Logo width="85px" height="67px" />
      <Typography variant="h6">Nome do App</Typography>
    </Toolbar>
    <Divider style={{ width: "100%" }} />
    <List>
      <ListItem component={Link} to={URLS.USUARIO}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <Typography color="black">Usuários</Typography>
      </ListItem>
      <ListItem component={Link} to={URLS.PATRIMONIO}>
        <ListItemIcon>
          <AccountBalanceIcon />
        </ListItemIcon>
        <Typography color="black">Patrimônio</Typography>
      </ListItem>
      <ListItem component={Link} to={URLS.DEPARTAMENTO}>
        <ListItemIcon>
          <BusinessCenterIcon />
        </ListItemIcon>
        <Typography color="black">Departamentos</Typography>
      </ListItem>
      <ListItem component={Link} to={URLS.REQUISICAO}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <Typography color="black">Requisições</Typography>
      </ListItem>
      <ListItem component={Link} to={URLS.MANUTENCAO}>
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <Typography color="black">Manutenções</Typography>
      </ListItem>
      <ListItem component={Link} to={URLS.GESTAO}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <Typography color="black">Gestão</Typography>
      </ListItem>
    </List>
  </Drawer>
);

export default Sidebar;
