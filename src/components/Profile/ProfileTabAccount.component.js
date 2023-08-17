import { Edit } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import apiCall from "../../services/apiCall";
import { MESSAGES } from "../../config";

export default function ProfileTabAccount() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const userData = auth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const base64Image = loadEvent.target.result;
        setSelectedImage(base64Image);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleSave = () => {
    apiCall(
      "post",
      "http://localhost:3030/users/1/photo",
      { photo: selectedImage },
      {
        Authorization: authHeader(),
      },
      MESSAGES.USER.POST
    );
    handleClose();
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Avatar
            src={userData.photo}
            alt={userData.name}
            style={{ width: 100, height: 100 }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<Edit />}
            style={{ marginTop: 15 }}
            onClick={handleOpen}
          >
            Editar Foto
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <input type="file" onChange={handleImageChange} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleSave} color="primary">
                Salvar
              </Button>
            </DialogActions>
          </Dialog>
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
