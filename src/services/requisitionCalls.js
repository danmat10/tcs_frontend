import { handleApiCall } from ".";
import { ENDPOINTS, MESSAGES } from "config";

const handleCreateRequisition = async ({ data, header, setState }) => {
  await handleApiCall(
    {
      method: "post",
      endpoint: ENDPOINTS.REQUISITION.POST,
      data: data,
      header: header,
    },
    MESSAGES.REQUISITION.POST
  );
  handleGetRequisitionList({ header, setState });
};

const handleGetRequisitionList = async ({ header, setState }) => {
  let requisitions = await handleApiCall(
    {
      method: "get",
      endpoint: ENDPOINTS.REQUISITION.GET,
      header: header,
    },
    MESSAGES.REQUISITION.GET
  );
  setState((prev) => ({ ...prev, requisitions, patrimonies: [] }));
};

const handleApproveRequest = async ({ data, header, setState }) => {
  await handleApiCall(
    {
      method: "put",
      endpoint: ENDPOINTS.REQUISITION.APPROVE,
      data: data,
      header: header,
    },
    MESSAGES.REQUISITION.APPROVE
  );
  handleGetRequisitionList({ header, setState });
};

const handleReturnRequest = async ({ data, header, setState }) => {
  await handleApiCall(
    {
      method: "put",
      endpoint: ENDPOINTS.REQUISITION.RETURN,
      data: data,
      header: header,
    },
    MESSAGES.REQUISITION.RETURN
  );
  handleGetRequisitionList({ header, setState });
};

export {
  handleCreateRequisition,
  handleGetRequisitionList,
  handleApproveRequest,
  handleReturnRequest,
};
