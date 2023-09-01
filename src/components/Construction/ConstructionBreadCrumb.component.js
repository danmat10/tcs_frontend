import React from "react";
import { Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { BusinessCenter, Home } from "@mui/icons-material";

import { URLS } from "config";

const ConstructionBreadcrumb = () => {
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
        Obras
      </Typography>
    </Breadcrumbs>
  );
};

export { ConstructionBreadcrumb };
