import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { Dialog } from "@mui/material";

import { Breadcrumb, PageContainer } from "components/Common";
import {
  DepartmentBreadcrumb,
  DepartmentCreate,
  DepartmentEdit,
  DepartmentList,
  DepartmentView,
} from "components/Department";
import { Header } from "components/Header";
import { handleGetDepartmentsList, handleGetUsersList } from "services";

const Department = () => {
  const authHeader = useAuthHeader();

  useEffect(() => {
    handleGetUsersList({
      header: { Authorization: authHeader() },
      setState: setState,
    });
    handleGetDepartmentsList({
      header: { Authorization: authHeader() },
      setState: setState,
    });
  }, []);

  const [state, setState] = useState({
    view: "",
    selectedDepartment: null,
    openDialog: false,
    users: [],
    departments: [],
  });

  const openDialog = (view, department = null) => {
    setState((prev) => ({
      ...prev,
      view,
      openDialog: true,
      selectedDepartment: department,
    }));
  };

  const closeDialog = () => {
    setState((prev) => ({ ...prev, view: "", openDialog: false }));
  };

  const views = {
    list: (
      <DepartmentList departments={state.departments} openDialog={openDialog} />
    ),
    create: (
      <DepartmentCreate
        onClose={closeDialog}
        users={state.users}
        setState={setState}
      />
    ),
    update: (
      <DepartmentEdit
        department={state.selectedDepartment}
        users={state.users}
        setState={setState}
        onClose={closeDialog}
      />
    ),
    view: (
      <DepartmentView
        department={state.selectedDepartment}
        onClose={closeDialog}
      />
    ),
  };

  return (
    <>
      <Header />
      <PageContainer>
        <Breadcrumb title="Departamentos">
          <DepartmentBreadcrumb />
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

export { Department };
