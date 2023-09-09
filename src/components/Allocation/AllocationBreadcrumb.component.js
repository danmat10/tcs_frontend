import React from "react";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import { Assignment, Home } from "@mui/icons-material";

import { URLS } from "config";

const AllocationBreadcrumb = () => {
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
        <Assignment style={{ marginRight: "5px" }} />
        Alocações
      </Typography>
    </Breadcrumbs>
  );
};

export { AllocationBreadcrumb };
