import { Dialog } from "@mui/material";
import {
  AllocationBreadcrumb,
  AllocationCreate,
  AllocationList,
  AllocationView,
} from "components/Allocation";
import { Breadcrumb, PageContainer } from "components/Common";
import { Header } from "components/Header";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { handleGetAllocationList, handleGetDepartmentsList } from "services";

const Allocation = () => {
  const [state, setState] = useState({
    view: "",
    selectedAlloctaion: null,
    openDialog: false,
    departments: [],
    patrimonies: [],
    allocations: [],
  });
  const authHeader = useAuthHeader();

  useEffect(() => {
    handleGetDepartmentsList({
      header: { Authorization: authHeader() },
      setState: setState,
    });
    handleGetAllocationList({
      header: { Authorization: authHeader() },
      setState: setState,
    });
  }, []);

  const openDialog = (view, allocation = null) => {
    setState((prev) => ({
      ...prev,
      view,
      openDialog: true,
      selectedAlloctaion: allocation,
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
      <AllocationList allocations={state.allocations} openDialog={openDialog} />
    ),
    create: (
      <AllocationCreate
        onClose={closeDialog}
        setState={setState}
        state={state}
      />
    ),
    view: (
      <AllocationView
        allocation={state.selectedAlloctaion}
        onClose={closeDialog}
      />
    ),
  };

  return (
    <>
      <Header />
      <PageContainer>
        <Breadcrumb title="Alocações">
          <AllocationBreadcrumb />
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

export { Allocation };
