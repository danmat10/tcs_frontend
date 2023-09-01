export {
  handleCreateDepartment,
  handleGetDepartmentsList,
  handleEditDepartment,
} from "./departmentCalls";
export {
  handleCreateUser,
  handleEditUser,
  handleGetUsersList,
} from "./userCalls";
export { handleLogin, handleEditPassword } from "./authCalls";
export { handleEditContacts, handleUploadPhoto } from "./profileCalls";
export { apiCall, handleApiCall, refreshApi, handleBuscaCep } from "./apiUtils";
export * from "./constructionCalls";
