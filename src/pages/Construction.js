import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { Dialog } from "@mui/material";

import { Breadcrumb, PageContainer } from "components/Common";
import {
  ConstructionBreadcrumb,
  ConstructionCreate,
  ConstructionList,
} from "components/Construction";
import { Header } from "components/Header";
import { handleGetConstructionList, handleGetUsersList } from "services";

const Construction = () => {
  const authHeader = useAuthHeader();

  useEffect(() => {
    handleGetUsersList({
      header: { Authorization: authHeader() },
      setState: setState,
    });
    handleGetConstructionList({
      header: { Authorization: authHeader() },
      setState: setState,
    });
  }, []);

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
    list: (
      <ConstructionList
        openDialog={openDialog}
        constructions={state.constructions}
      />
    ),
    create: (
      <ConstructionCreate
        onClose={closeDialog}
        users={state.users}
        setState={setState}
      />
    ),
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

export { Construction };
