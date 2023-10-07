import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";

import {
  RequisitionBreadcrumb,
  RequisitionCreate,
  RequisitionList,
} from "components/Requisition";
import { Breadcrumb, PageContainer } from "components/Common";
import { Header } from "components/Header";
import { handleGetConstructionList } from "services";

const Requisition = () => {
  const [state, setState] = useState({
    view: "",
    selectedAlloctaion: null,
    openDialog: false,
    constructions: [],
    patrimonies: [],
    requisitions: [],
  });
  const authHeader = useAuthHeader();

  useEffect(() => {
    handleGetConstructionList({
      header: { Authorization: authHeader() },
      setState: setState,
    });
  }, []);

  const openDialog = (view, Requisition = null) => {
    setState((prev) => ({
      ...prev,
      view,
      openDialog: true,
      selectedRequisition: Requisition,
    }));
  };

  const closeDialog = () => {
    setState((prev) => ({
      ...prev,
      view: "",
      openDialog: false,
      patrimonies: [],
    }));
  };

  const views = {
    list: (
      <RequisitionList
        requisitions={state.requisitions}
        openDialog={openDialog}
      />
    ),
    create: (
      <RequisitionCreate
        onClose={closeDialog}
        setState={setState}
        state={state}
      />
    ),
    view: null,
  };

  return (
    <>
      <Header />
      <PageContainer>
        <Breadcrumb title="Requisições">
          <RequisitionBreadcrumb />
        </Breadcrumb>
        {views.list}
      </PageContainer>
      <Dialog
        open={state.openDialog}
        onClose={closeDialog}
        PaperProps={{ sx: { borderRadius: "28px" } }}
        maxWidth="md"
      >
        {views[state.view]}
      </Dialog>
    </>
  );
};

export { Requisition };
