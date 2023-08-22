import { useContext, useEffect } from "react";
import { useRef, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Avatar,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";

import ENDPOINTS from "../../services/endpoints";
import UserContext from "../../contexts/UserContext";
import apiCall from "../../services/apiCall";
import placeholder_image from "../../assets/images/placeholder_image.jpg";
import { MESSAGES } from "../../config";
import { validateProfileContactsForm } from "../../validations";
import { ProfileContactsFormFields, styles } from ".";

export default function ProfileTabAccount() {
  const { user, setUser } = useContext(UserContext);
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(placeholder_image);
  const fileInputRef = useRef();
  const formik = useFormik({
    initialValues: {
      contatos: user.contatos || [],
    },
    validate: (values) => validateProfileContactsForm(values, user),
    validateOnChange: false,
    onSubmit: (values) => {
      onUpdate(values);
    },
  });

  useEffect(() => {
    if (user && user.photo) {
      setPreviewSrc(ENDPOINTS.USER.PROFILE.GET_PHOTO(user.photo));
    }
    if (user) {
      formik.resetForm({
        values: { contatos: user.contatos || [] },
      });
    }
  }, [user]);

  const onUpdate = async (values) => {
    await apiCall(
      "patch",
      ENDPOINTS.USER.PATCH_ID(auth().id),
      values,
      {
        Authorization: authHeader(),
      },
      MESSAGES.USER.PROFILE.PATCH_CONTACTS
    );
  };

  const onUpload = async () => {
    const formData = new FormData();
    formData.append("photo", file);
    await toast
      .promise(
        axios.post(ENDPOINTS.USER.PROFILE.POST_PHOTO(auth().id), formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: authHeader(),
          },
        }),
        MESSAGES.USER.PROFILE.POST_PHOTO
      )
      .then((response) => {
        setPreviewSrc(ENDPOINTS.USER.PROFILE.GET_PHOTO(response.data.photo));
        setFile(null);
        setUser((prevUser) => ({ ...prevUser, photo: response.data.photo }));
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
    setPreviewSrc(ENDPOINTS.USER.PROFILE.GET_PHOTO(user.photo));
    setFile(null);
  };
  const onEditPhotoClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.gridContainer}>
      <Grid container spacing={4}>
        <Grid item xs={4} md={2}>
          <Avatar
            src={previewSrc}
            alt={user.name}
            sx={{ width: 150, height: 150 }}
            variant="square"
          />
          <input
            type="file"
            style={{ display: "none" }}
            onChange={onFileChange}
            ref={fileInputRef}
          />
        </Grid>
        <Grid
          item
          xs={4}
          md={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {!file && (
            <Grid item xs={12} md={12}>
              <Button onClick={onEditPhotoClick} variant="contained">
                Carregar uma imagem
              </Button>
              <FormHelperText>Adicione uma imagem de perfil.</FormHelperText>
            </Grid>
          )}
          {file && (
            <Button onClick={onUpload} variant="contained">
              Salvar
            </Button>
          )}
          {file && (
            <Button onClick={onCancel} variant="outlined" color="error">
              Excluir
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <FormControl component="fieldset" margin="normal" fullWidth>
            <TextField
              label="Login"
              value={user.login || ""}
              disabled
              fullWidth
              margin="normal"
            />
            <TextField
              label="Name"
              value={user.name || ""}
              disabled
              fullWidth
              margin="normal"
            />
            <TextField
              label="CPF"
              value={user.cpf || ""}
              disabled
              fullWidth
              margin="normal"
            />
            <TextField
              label="Registration"
              value={user.registration || ""}
              disabled
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={user.email || ""}
              disabled
              fullWidth
              margin="normal"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
              <ProfileContactsFormFields formik={formik} />
            </Form>
          </FormikProvider>
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        margin="normal"
        onClick={() => formik.submitForm()}
      >
        Salvar
      </Button>
    </div>
  );
}
