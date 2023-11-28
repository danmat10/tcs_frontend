import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemIcon,
  Toolbar,
  Typography,
  Divider,
  Collapse,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  AccountBalance,
  Assignment,
  BarChart,
  Build,
  BusinessCenter,
  CheckBox,
  Construction,
  ExpandLess,
  ExpandMore,
  LocalShipping,
  People,
} from "@mui/icons-material";

import { ReactComponent as Logo } from "assets/icons/logo azul.svg";
import { URLS } from "config";
import { useIsAdmin } from "routes/useIsAdmin";
import { useIsGestor } from "routes";

const Sidebar = ({ isOpen, onClose }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
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
      <Toolbar
        sx={{
          padding: "0px !important",
        }}
      >
        <Logo width="65px" height="65px" />
        <Typography variant="h6">Control Patrimonial</Typography>
      </Toolbar>
      <Divider style={{ width: "100%" }} />
      <List
        sx={{
          width: "100%",
        }}
      >
        {useIsGestor() && (
          <>
            <ListItemButton component={Link} to={URLS.ALOCACAO}>
              <ListItemIcon>
                <Assignment />
              </ListItemIcon>
              <ListItemText primary="Alocações" />
            </ListItemButton>
            <ListItemButton component={Link} to={URLS.DEPARTAMENTO}>
              <ListItemIcon>
                <BusinessCenter />
              </ListItemIcon>
              <ListItemText primary="Departamentos" />
            </ListItemButton>
          </>
        )}
        {useIsAdmin() && (
          <ListItemButton component={Link} to={URLS.GESTAO}>
            <ListItemIcon>
              <BarChart />
            </ListItemIcon>
            <ListItemText primary="Gestão" />
          </ListItemButton>
        )}
        {useIsGestor() && (
          <>
            <ListItemButton component={Link} to={URLS.MANUTENCAO}>
              <ListItemIcon>
                <Build />
              </ListItemIcon>
              <ListItemText primary="Manutenções" />
            </ListItemButton>
            <ListItemButton component={Link} to={URLS.PATRIMONIO}>
              <ListItemIcon>
                <AccountBalance />
              </ListItemIcon>
              <ListItemText primary="Patrimônios" />
            </ListItemButton>
          </>
        )}
        {useIsAdmin() && (
          <ListItemButton component={Link} to={URLS.USUARIO}>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Usuários" />
          </ListItemButton>
        )}
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <CheckBox />
          </ListItemIcon>
          <ListItemText primary="Requisições" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {useIsGestor() && (
              <ListItemButton sx={{ pl: 4 }} component={Link} to={URLS.OBRA}>
                <ListItemIcon>
                  <Construction />
                </ListItemIcon>
                <ListItemText primary="Obras" />
              </ListItemButton>
            )}
            <ListItemButton
              sx={{ pl: 4 }}
              component={Link}
              to={URLS.REQUISICAO}
            >
              <ListItemIcon>
                <LocalShipping />
              </ListItemIcon>
              <ListItemText primary="Solicitações" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export { Sidebar };
