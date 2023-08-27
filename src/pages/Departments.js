import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { Dialog } from "@mui/material";

import { MESSAGES, ENDPOINTS } from "config";
import { apiCall } from "services";
import { Breadcrumb, PageContainer } from "components/Common";
import { Header } from "components/Header";
import {
  DepartmentBreadcrumb,
  DepartmentCreate,
  DepartmentEdit,
  DepartmentList,
  DepartmentView,
} from "components/Department";

const DepartmentsPage = () => {
  useEffect(() => {
    handleGetUsersList();
    handleGetDepartmentsList();
  }, []);

  const [state, setState] = useState({
    view: "",
    selectedDepartment: null,
    openDialog: false,
    users: [],
    departments: [],
  });
  const authHeader = useAuthHeader();

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

  const handleApiCall = async (config, toastObject) => {
    const { method, endpoint, data } = config;
    const response = await apiCall(
      method,
      endpoint,
      data,
      {
        Authorization: authHeader(),
      },
      toastObject
    );
    return response;
  };

  const handleCreateDepartment = async (department) => {
    await handleApiCall(
      { method: "post", endpoint: ENDPOINTS.DEPARTMENT.POST, data: department },
      MESSAGES.DEPARTMENT.POST
    );
    handleGetDepartmentsList();
  };

  const handleGetUsersList = async () => {
    let users = await handleApiCall(
      {
        method: "get",
        endpoint: ENDPOINTS.USER.GET,
      },
      MESSAGES.USER.GET
    );
    if (!users) users = [];
    setState((prev) => ({ ...prev, users }));
  };

  const handleGetDepartmentsList = async () => {
    let departments = await handleApiCall(
      {
        method: "get",
        endpoint: ENDPOINTS.DEPARTMENT.GET,
      },
      MESSAGES.DEPARTMENT.GET
    );
    if (!departments) departments = [];
    setState((prev) => ({ ...prev, departments }));
  };

  const handleEditDepartment = async (department) => {
    await handleApiCall(
      {
        method: "patch",
        endpoint: ENDPOINTS.DEPARTMENT.PATCH_id(department.id),
        data: department,
      },
      MESSAGES.DEPARTMENT.PATCH
    );
    handleGetDepartmentsList();
  };

  const views = {
    list: (
      <DepartmentList departments={state.departments} openDialog={openDialog} />
    ),
    create: (
      <DepartmentCreate
        onCreate={handleCreateDepartment}
        onClose={closeDialog}
        users={state.users}
      />
    ),
    update: (
      <DepartmentEdit
        department={state.selectedDepartment}
        users={state.users}
        onUpdate={handleEditDepartment}
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

export default DepartmentsPage;
