import { Container, Grid, Typography } from "@mui/material"

import { Header } from "../components/Header"
import { UserBreadcrumb } from "../components/User"


const ProfilePage = () => {
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Grid item lg={12} paddingY={5}>
          <UserBreadcrumb />
          <Typography variant="h4" marginTop={2}>
            Perfil
          </Typography>
        </Grid>
      </Container>
      <Container maxWidth="xl"></Container>
    </>)
}

export default ProfilePage