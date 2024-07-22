import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DA0037",
    },
    secondary: {
      main: "#171717",
    },
    background: {
      default: "#171717",
      paper: "#EDEDED",
    },
    text: {
      primary: "#171717",
      secondary: "#444444",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.MuiButton-containedPrimary": {
            color: "#FFFFFF",
            borderRadius: "0.6rem",
            fontWeight: "500",
          },
          "&.MuiButton-outlinedPrimary": {
            color: "#DA0037",
            borderRadius: "0.6rem",
            fontWeight: "600",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderWidth: "1px",
              borderStyle: "solid",
              borderRadius: "0.7rem",
              borderColor: "transparent",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#444444",
            },
          },
          "& .MuiOutlinedInput-input": {
            backgroundColor: "#FFFFFF",
            borderRadius: "0.7rem",
            "&:-webkit-autofill": {
              "-webkit-box-shadow": "0 0 0 100px #FFFFFF inset",
              "-webkit-text-fill-color": "#444444",
            },
          },
          "& .MuiInputAdornment-root": {
            position: "relative",
            zIndex: 1, // Coloca os ícones na frente
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#444444",
          "&.Mui-focused": {
            color: "#444444",
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "0.8rem",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#DA0037",
          borderRadius: "1rem",
          marginTop: "2rem",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          "& .MuiTabs-indicator": {
            display: "none",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#EDEDED",
          fontWeight: "400",
          mx: 1.8,
          "&.Mui-selected": {
            color: "#EDEDED",
            fontWeight: "600",
          },
          "&.MuiTab-root": {
            textTransform: "none",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#EDEDED",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          "& .MuiMenu-paper": {
            backgroundColor: "#EDEDED",
            color: "#171717",
          },
        },
      },
    },
  },
});

export default theme;
