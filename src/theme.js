const { createTheme } = require("@mui/material");

const theme = createTheme({
  components: {
    MuiDataGrid: {
      defaultProps: {
        slotProps: {
          panel: {
            sx: {
              "& .MuiDataGrid-panelWrapper": {
                maxWidth: "calc(100vw - 4rem)",
              },
            },
          },
        },
      },
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: "standard" },
          style: {
            "& .Mui-disabled": {
              WebkitTextFillColor: "black !important",
            },
          },
        },
      ],
    },
  },
});

export { theme };
