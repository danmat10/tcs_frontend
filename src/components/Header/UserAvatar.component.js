import React, { useEffect } from "react";
import { useAuthUser, useAuthHeader } from "react-auth-kit";
import axios from "axios";
import { Avatar } from "@mui/material";

import UserContext from "../../contexts/UserContext";
import { BASEURL } from "../../config";
import { ENDPOINTS } from "../../services";

const UserAvatar = ({ onClick }) => {
  const { user, setUser } = React.useContext(UserContext);
  const auth = useAuthUser();
  const authHeader = useAuthHeader();

  useEffect(() => {
    if (!user.id) {
      axios
        .get(ENDPOINTS.USER.GET_ID(auth().id), {
          headers: {
            Authorization: authHeader(),
          },
        })
        .then((response) => {
          setUser(response.data);
        });
    }
  });

  const photo = user.photo ? BASEURL + "/" + user.photo : null;

  return (
    <Avatar src={photo} onClick={onClick} sx={{ cursor: "pointer" }}></Avatar>
  );
};

export default UserAvatar;
