const { ENDPOINTS } = require("config");
const { handleApiCall } = require("./apiUtils");
const { MESSAGES } = require("config");

const handleCreateConstruction = async ({ data, header, setState }) => {
    await handleApiCall(
        {
            method: "post",
            endpoint: ENDPOINTS.CONSTRUCTION.POST,
            data: data,
            header: header,
        },
        MESSAGES.CONSTRUCTION.POST
    );
    handleGetConstructionList({ header, setState });
};

const handleGetConstructionList = async ({ header, setState }) => {
    let constructions = await handleApiCall(
        {
            method: "get",
            endpoint: ENDPOINTS.CONSTRUCTION.GET,
            header: header,
        },
        MESSAGES.CONSTRUCTION.GET
    );
    if (!constructions) constructions = [];
    setState((prev) => ({ ...prev, constructions }));
};

export { handleCreateConstruction, handleGetConstructionList }