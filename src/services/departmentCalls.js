const { ENDPOINTS } = require("config");
const { handleApiCall } = require("./apiUtils");
const { MESSAGES } = require("config");

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

export {
  handleCreateDepartment,
  handleGetDepartmentsList,
  handleEditDepartment,
};
