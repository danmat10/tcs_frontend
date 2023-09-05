import React from "react";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import { BusinessCenter, Home } from "@mui/icons-material";
import { URLS } from "config";

const DepartmentBreadcrumb = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        color="inherit"
        href={URLS.HOME}
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
};

export { DepartmentBreadcrumb };
