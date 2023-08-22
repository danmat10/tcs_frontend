import React, { useState, useContext } from "react";
import { useSignOut } from "react-auth-kit";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { MenuButton, UserAvatar, UserMenu, Sidebar, styles } from ".";
import UserContext from "contexts/UserContext";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setUser } = useContext(UserContext);
  const signOut = useSignOut();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUser({ photo: null, id: null });
    signOut();
  };

  const handleEditProfile = () => {
    handleMenuClose();
  };

  return (
    <>
      <AppBar position="static" elevation={2} className={styles.appBar}>
        <Toolbar>
          <MenuButton onClick={toggleSidebar} />
          <Typography
            sx={{
              flexGrow: 1,
            }}
          >
            Control
          </Typography>
          <UserAvatar onClick={handleMenuOpen} />
          <UserMenu
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            onEditProfile={handleEditProfile}
            onLogout={handleLogout}
          />
        </Toolbar>
      </AppBar>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
};

export default Header;
