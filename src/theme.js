const { createTheme } = require("@mui/material");

const theme = createTheme({
  components: {
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
