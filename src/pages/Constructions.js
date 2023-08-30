import { useState } from "react";
import { Dialog } from "@mui/material";

import { Breadcrumb, PageContainer } from "components/Common";
import { ConstructionBreadcrumb } from "components/Construction";
import { ConstructionList } from "components/Construction";
import { Header } from "components/Header";

const ConstructionsPage = () => {
  const [state, setState] = useState({
    view: "",
    selectedConstruction: null,
    openDialog: false,
    users: [],
    constructions: [],
  });

  const openDialog = (view, construction = null) => {
    setState((prev) => ({
      ...prev,
      view,
      openDialog: true,
      selectedConstruction: construction,
    }));
  };

  const closeDialog = () => {
    setState((prev) => ({ ...prev, view: "", openDialog: false }));
  };

  const views = {
    list: null,
    create: null,
    update: null,
    view: null,
  };

  return (
    <>
      <Header />
      <PageContainer>
        <Breadcrumb title="Obras">
          <ConstructionBreadcrumb />
        </Breadcrumb>
        {views.list}
      </PageContainer>
      <Dialog
        open={state.openDialog}
        onClose={closeDialog}
        PaperProps={{ sx: { borderRadius: "28px" } }}
      >
        {views[state.view]}
      </Dialog>
    </>
  );
};

export default ConstructionsPage;
