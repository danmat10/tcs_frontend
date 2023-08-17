import axios from "axios";
import { useRef, useState } from "react";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { toast } from "react-toastify";
import { Avatar, Button, Grid, Typography } from "@mui/material";

import { BASEURL, MESSAGES } from "../../config";
import ENDPOINTS from "../../services/endpoints";

export default function ProfileTabAccount() {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const userData = auth();
  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(BASEURL + "/" + userData.photo);
  const fileInputRef = useRef();

  const onUpload = async () => {
    const formData = new FormData();
    formData.append("photo", file);

    await toast
      .promise(
        axios.post(ENDPOINTS.USER.PROFILE.POST_PHOTO(userData.id), formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: authHeader(),
          },
        }),
        MESSAGES.USER.PROFILE.POST_PHOTO
      )
      .then((response) => {
        setPreviewSrc(BASEURL + "/" + response.data.photo);
        const storedAuthState = localStorage.getItem("_auth_state");
        if (storedAuthState) {
          const authState = JSON.parse(storedAuthState);
          authState.photo = response.data.photo;
          localStorage.setItem("_auth_state", JSON.stringify(authState));
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onCancel = () => {
    setPreviewSrc(BASEURL + "/" + userData.photo);
    setFile(null);
  };
  const onEditPhotoClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Avatar
            src={previewSrc}
            alt={userData.name}
            style={{ width: 100, height: 100 }}
          />
          <div>
            <input
              type="file"
              style={{ display: "none" }}
              onChange={onFileChange}
              ref={fileInputRef}
            />
            {!file && <Button onClick={onEditPhotoClick}>Editar Foto</Button>}
            {file && (
              <>
                <Button onClick={onUpload}>Alterar</Button>
                <Button onClick={onCancel}>Cancelar</Button>
              </>
            )}
          </div>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="body1">
            <strong>Login:</strong> {userData.login}
          </Typography>
          <Typography variant="body1">
            <strong>Name:</strong> {userData.name}
          </Typography>
          <Typography variant="body1">
            <strong>CPF:</strong> {userData.cpf}
          </Typography>
          <Typography variant="body1">
            <strong>Registration:</strong> {userData.registration}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {userData.email}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
