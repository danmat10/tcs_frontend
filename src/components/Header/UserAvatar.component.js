import React from "react";
import Avatar from "@mui/material/Avatar";

const UserAvatar = ({ onClick, initial }) => (
  <Avatar onClick={onClick} sx={{ cursor: "pointer" }}>
    {initial}
  </Avatar>
);

export default UserAvatar;
