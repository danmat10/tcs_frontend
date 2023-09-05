const { createTheme } = require("@mui/material");

const theme = createTheme({
  components: {
    MuiTextField: {
      variants: [
        {
          props: { variant: "standard" },
          style: {
            "& .Mui-disabled": {
              color: "black",
            },
          },
        },
      ],
    },
  },
});

export { theme };
