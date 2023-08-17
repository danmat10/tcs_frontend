import React from "react";
import { Avatar } from "@mui/material";
import { useAuthUser } from "react-auth-kit";
import { BASEURL } from "../../config";

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
  const photo = user.photo ? BASEURL + "/" + user.photo : null;

  return (
    <Avatar src={photo} onClick={onClick} sx={{ cursor: "pointer" }}>
      {!photo && initials}
    </Avatar>
  );
};

export default UserAvatar;
