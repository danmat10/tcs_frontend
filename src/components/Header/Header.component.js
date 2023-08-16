import React, { Component } from "react";
import { withSignOut } from "react-auth-kit";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { MenuButton, UserAvatar, UserMenu, Sidebar, styles } from ".";

class Header extends Component {
  state = {
    anchorEl: null,
    isSidebarOpen: false,
  };

  toggleSidebar = () => {
    this.setState((prevState) => ({ isSidebarOpen: !prevState.isSidebarOpen }));
  };

  handleMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.props.signOut();
  };

  handleEditProfile = () => {
    this.handleMenuClose();
  };

  render() {
    const { anchorEl, isSidebarOpen } = this.state;

    return (
      <>
        <AppBar position="static" elevation={2} className={styles.appBar}>
          <Toolbar>
            <MenuButton onClick={this.toggleSidebar} />
            <Typography
              sx={{
                flexGrow: 1,
              }}
            >
              Control
            </Typography>
            <UserAvatar onClick={this.handleMenuOpen} />
            <UserMenu
              anchorEl={anchorEl}
              onClose={this.handleMenuClose}
              onEditProfile={this.handleEditProfile}
              onLogout={this.handleLogout}
            />
          </Toolbar>
        </AppBar>
        <Sidebar isOpen={isSidebarOpen} onClose={this.toggleSidebar} />
      </>
    );
  }
}

export default withSignOut(Header);
