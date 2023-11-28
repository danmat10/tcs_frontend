import { handleApiCall } from ".";
import { ENDPOINTS, MESSAGES } from "config";

const handleCreateInventory = async ({ data, header, setState }) => {
  await handleApiCall(
    {
      method: "post",
      endpoint: ENDPOINTS.INVENTORY.POST,
      data: data,
      header: header,
    },
    MESSAGES.INVENTORY.POST
  );
  handleGetInventoryList({ header, setState });
};

const handleGetInventoryList = async ({ header, setState }) => {
  let inventory = await handleApiCall(
    {
      method: "get",
      endpoint: ENDPOINTS.INVENTORY.GET,
      header: header,
    },
    MESSAGES.INVENTORY.GET
  );
  if (!inventory) inventory = [];
  setState((prev) => ({ ...prev, inventories: inventory }));
};

const handleEditInventory = async ({ data, header, setState }) => {
  await handleApiCall(
    {
      method: "patch",
      endpoint: ENDPOINTS.INVENTORY.PUT_ID(data.id),
      data: data,
      header: header,
    },
    MESSAGES.INVENTORY.PUT
  );
  handleGetInventoryList({ header, setState });
};

export { handleCreateInventory, handleGetInventoryList, handleEditInventory };
