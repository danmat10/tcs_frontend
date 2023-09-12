import { handleApiCall } from ".";
import { ENDPOINTS, MESSAGES } from "config";


const handleCreateDepartment = async ({ data, header, setState }) => {
  await handleApiCall(
    {
      method: "post",
      endpoint: ENDPOINTS.DEPARTMENT.POST,
      data: data,
      header: header,
    },
    MESSAGES.DEPARTMENT.POST
  );
  handleGetDepartmentsList({ header, setState });
};

const handleGetDepartmentsList = async ({ header, setState }) => {
  let departments = await handleApiCall(
    {
      method: "get",
      endpoint: ENDPOINTS.DEPARTMENT.GET,
      header: header,
    },
    MESSAGES.DEPARTMENT.GET
  );
  if (!departments) departments = [];
  setState((prev) => ({ ...prev, departments }));
};

const handleEditDepartment = async ({ data, header, setState }) => {
  await handleApiCall(
    {
      method: "patch",
      endpoint: ENDPOINTS.DEPARTMENT.PATCH_id(data.id),
      data: data,
      header: header,
    },
    MESSAGES.DEPARTMENT.PATCH
  );
  handleGetDepartmentsList({ header, setState });
};

const handleDeleteDepartment = async ({ id, header, setState }) => {
  const response = await handleApiCall(
    {
      method: "delete",
      endpoint: ENDPOINTS.DEPARTMENT.DELETE_id(id),
      header: header,
    },
    MESSAGES.DEPARTMENT.DELETE
  );
  handleGetDepartmentsList({ header, setState });
  if (response) {
    return true;
  }
};

export {
  handleCreateDepartment,
  handleGetDepartmentsList,
  handleEditDepartment,
  handleDeleteDepartment
};
