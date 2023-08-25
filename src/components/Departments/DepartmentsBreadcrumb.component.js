import React from "react";
import { Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { BusinessCenter, Home } from "@mui/icons-material";

export default function DepartmentsBreadcrumb() {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        color="inherit"
        href="/"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Home style={{ marginRight: "5px" }} />
        Home
      </Link>
      <Typography
        color="inherit"
        style={{ display: "flex", alignItems: "center" }}
      >
        <BusinessCenter style={{ marginRight: "5px" }} />
        Departamentos
      </Typography>
    </Breadcrumbs>
  );
}
