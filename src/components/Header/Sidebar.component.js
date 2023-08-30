import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import {
  AccountBalance,
  Assignment,
  BarChart,
  Build,
  BusinessCenter,
  Construction,
  People,
} from "@mui/icons-material";

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
          <People />
        </ListItemIcon>
        <Typography color="black">Usuários</Typography>
      </ListItem>
      <ListItem component={Link} to={URLS.PATRIMONIO}>
        <ListItemIcon>
          <AccountBalance />
        </ListItemIcon>
        <Typography color="black">Patrimônio</Typography>
      </ListItem>
      <ListItem component={Link} to={URLS.DEPARTAMENTO}>
        <ListItemIcon>
          <BusinessCenter />
        </ListItemIcon>
        <Typography color="black">Departamentos</Typography>
      </ListItem>
      <ListItem component={Link} to={URLS.OBRA}>
        <ListItemIcon>
          <Construction />
        </ListItemIcon>
        <Typography color="black">Obras</Typography>
      </ListItem>
      <ListItem component={Link} to={URLS.REQUISICAO}>
        <ListItemIcon>
          <Assignment />
        </ListItemIcon>
        <Typography color="black">Requisições</Typography>
      </ListItem>
      <ListItem component={Link} to={URLS.MANUTENCAO}>
        <ListItemIcon>
          <Build />
        </ListItemIcon>
        <Typography color="black">Manutenções</Typography>
      </ListItem>
      <ListItem component={Link} to={URLS.GESTAO}>
        <ListItemIcon>
          <BarChart />
        </ListItemIcon>
        <Typography color="black">Gestão</Typography>
      </ListItem>
    </List>
  </Drawer>
);

export default Sidebar;
