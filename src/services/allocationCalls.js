import { handleApiCall } from ".";
import { ENDPOINTS, MESSAGES } from "config";

const handleCreateAllocation = async ({ data, header, setState }) => {
  await handleApiCall(
    {
      method: "post",
      endpoint: ENDPOINTS.ALLOCATION.POST,
      data: data,
      header: header,
    },
    MESSAGES.ALLOCATION.POST
  );
  handleGetAllocationList({ header, setState });
};

const handleGetAllocationList = async ({ header, setState }) => {
  let allocations = await handleApiCall(
    {
      method: "get",
      endpoint: ENDPOINTS.ALLOCATION.GET,
      header: header,
    },
    MESSAGES.ALLOCATION.GET
  );
  if (!allocations) allocations = [];
  setState((prev) => ({ ...prev, allocations, patrimonies: [] }));
};

export { handleCreateAllocation, handleGetAllocationList };
