const { createTheme } = require("@mui/material");

const theme = createTheme({
  components: {
    MuiTextField: {
      variants: [
        {
          props: { variant: "standard" },
          style: {
            "& .Mui-disabled": {
              "-webkit-text-fill-color": "black !important",
            },
          },
        },
      ],
    },
  },
});

export { theme };
