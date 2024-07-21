import { createTheme, ThemeProvider } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
            },
            "&:hover fieldset": {
              borderColor: "black",
            },
            "&.Mui-focused fieldset": {
              borderColor: "black",
            },
          },
          "& .MuiInputLabel-root": {
            color: "black",
            "&.Mui-focused": {
              color: "black",
            },
          },
          "& .MuiInputBase-input": {
            color: "black",
            fontSize: "1rem", // Tamanho da fonte
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "1rem", // Ajuste do tamanho da fonte das opções do select
          color: "black",
        },
      },
    },
  },
});
