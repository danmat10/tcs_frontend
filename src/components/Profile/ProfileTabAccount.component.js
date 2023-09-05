import { useContext, useEffect } from "react";
import { useRef, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import {
  Avatar,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";

import { ENDPOINTS } from "config";
import UserContext from "contexts/UserContext";
import placeholder_image from "assets/images/placeholder_image.jpg";
import { handleEditContacts, handleUploadPhoto } from "services";
import { validateContacts } from "validations";
import { ProfileContactsFormFields, styles } from ".";

const ProfileTabAccount = () => {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const { user, setUser } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(placeholder_image);
  const fileInputRef = useRef();
  const formik = useFormik({
    initialValues: {
      contacts: user.contacts || [],
    },
    validate: (values) => validateContacts(values.contacts, user),
    validateOnChange: false,
    onSubmit: (values) => {
      const valuesToSubmit = {
        id: user.id,
        nmUsuario: user.nmUsuario,
        nrMatricula: user.nrMatricula,
        nrCpf: user.nrCpf,
        typeUser: user.typeUser,
        flStatus: user.flStatus,
        contacts: values.contacts,
      };
      handleEditContacts({
        data: valuesToSubmit,
        header: {
          Authorization: authHeader(),
        },
      });
    },
  });

  useEffect(() => {
    if (user && user.photo) {
      setPreviewSrc(ENDPOINTS.USER.PROFILE.GET_PHOTO(user.photo));
    }
    if (user) {
      formik.resetForm({
        values: { contacts: user.contacts || [] },
      });
    }
  }, [user]);

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

  const onUploadPhotoClick = async () => {
    handleUploadPhoto({
      data: file,
      header: {
        "Content-Type": "multipart/form-data",
        Authorization: authHeader(),
      },
      setPreviewSrc: setPreviewSrc,
      setFile: setFile,
      setUser: setUser,
      id: auth().id,
    });
  };

  return (
    <div className={styles.gridContainer}>
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            display: "flex",
          }}
          justifyContent={{
            xs: "center",
            md: "flex-start",
          }}
        >
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
          xs={12}
          md={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {!file && (
            <Grid
              item
              xs={12}
              md={12}
              textAlign={{
                xs: "center",
                md: "left",
              }}
            >
              <Button onClick={onEditPhotoClick} variant="contained">
                Carregar uma imagem
              </Button>
              <FormHelperText
                sx={{
                  textAlign: {
                    xs: "center",
                    md: "left",
                  },
                }}
              >
                Adicione uma imagem de perfil.
              </FormHelperText>
            </Grid>
          )}
          {file && (
            <Button onClick={onUploadPhotoClick} variant="contained">
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
      <Grid
        container
        spacing={{
          xs: 0,
          md: 2,
        }}
      >
        <Grid item xs={11} md={5}>
          <FormControl component="fieldset" margin="normal" fullWidth>
            <TextField
              label="Name"
              value={user.nmUsuario || ""}
              disabled
              fullWidth
              margin="normal"
            />
            <TextField
              label="CPF"
              value={user.nrCpf || ""}
              disabled
              fullWidth
              margin="normal"
            />
            <TextField
              label="Matrícula"
              value={user.nrMatricula || ""}
              disabled
              fullWidth
              margin="normal"
            />
            <TextField
              label="Permissões"
              value={user.typeUser || ""}
              disabled
              fullWidth
              margin="normal"
            />
          </FormControl>
        </Grid>
        <Grid item xs={11} md={6}>
          <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
              <ProfileContactsFormFields formik={formik} />
            </Form>
          </FormikProvider>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        sx={{
          textAlign: { xs: "center", md: "start" },
        }}
      >
        <Button
          type="submit"
          variant="contained"
          margin="normal"
          onClick={() => formik.submitForm()}
        >
          Salvar
        </Button>
      </Grid>
    </div>
  );
};

export { ProfileTabAccount };
