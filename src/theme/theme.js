import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
    mode: "light",
    background: {
      default: "#ffffff",
      
    },
    text: {
      primary: "#2B2B2B",    
      secondary: "#6B6B6B"
    },
    primary: {
      main: "#ff992f",
      contrastText: "#ffffff",
    },
    divider: "#e6e6e6",

    action: {
      hover: "#e58b2a",
    },
    shape: {
      borderRadius: 10, 
    },
    typography: {
      fontFamily: `"Inter", "Helvetica", "Arial", sans-serif`,
    },
  },
})

