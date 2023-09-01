import { Container } from "@mui/material";

const PageContainer = ({ children }) => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        margin: "auto",
        marginLeft: { xs: "20px", xl: "auto" },
        marginBottom: "20px",
        width: "auto",
      }}
    >
      {children}
    </Container>
  );
};

export { PageContainer };
