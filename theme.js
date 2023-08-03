import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  status: {},
  palette: {
    primary: {
      main: "#ffffff",
      contrastText: "#000000",
    },
    secondary: {
      main: "#000000",
      contrastText: "#fff",
    },
    grey: {
      main: "#f6f6f8",
      darkGrey: "#5A5A5A",
      lightGrey: "#808080",
      silver: "#c0c0c0",
      contrastText: "#000000",
    },
    brown: {
      main: "#A8623E",
      dark: "#400C02",
      contrastText: "#fff",
    },
    black: {
      main: "#0f0f11",
      contrastText: "fff",
    },
    background: {
      default: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["'Poppins', sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["'Poppins', sans-serif"].join(","),
      fontSize: 40,
    },
    h2: {
      fontFamily: ["'Poppins', sans-serif"].join(","),
      fontSize: 32,
    },
    h3: {
      fontFamily: ["'Poppins', sans-serif"].join(","),
      fontSize: 24,
    },
    h4: {
      fontFamily: ["'Poppins', sans-serif"].join(","),
      fontSize: 20,
    },
    h5: {
      fontFamily: ["'Poppins', sans-serif"].join(","),
      fontSize: 16,
    },
    h6: {
      fontFamily: ["'Poppins', sans-serif"].join(","),
      fontSize: 14,
    },
    a3: {
      fontFamily: ["'EB Garamond', serif"].join(","),
      fontSize: 24,
    },
    a4: {
      fontFamily: ["'EB Garamond', serif"].join(","),
      fontSize: 20,
    },
    a5: {
      fontFamily: ["'EB Garamond', serif"].join(","),
      fontSize: 16,
    },
  },
});

export default theme;
