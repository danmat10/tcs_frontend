import React from "react";
import { Avatar } from "@mui/material";
import { useAuthUser } from "react-auth-kit";

const getInitials = (name) => {
  if (!name || typeof name !== "string") return "";

  const splitName = name.trim().split(" ");
  if (splitName.length === 1) {
    return splitName[0][0].toUpperCase();
  }

  const firstNameInitial = splitName[0][0];
  const lastNameInitial = splitName[splitName.length - 1][0];
  return (firstNameInitial + lastNameInitial).toUpperCase();
};

const UserAvatar = ({ onClick }) => {
  const auth = useAuthUser();
  const user = auth();
  const initials = getInitials(user.name);

  return (
    <Avatar src={user.photo} onClick={onClick} sx={{ cursor: "pointer" }}>
      {!user.photo && initials}
    </Avatar>
  );
};

export default UserAvatar;
