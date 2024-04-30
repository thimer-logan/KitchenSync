"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const freshCleanTheme = {
  primary: {
    main: "#4CAF50",
  },
  secondary: {
    main: "#FFEB3B",
  },
  background: {
    default: "#FFFFFF",
  },
  text: {
    primary: "#333333",
  },
  info: {
    main: "#2196F3",
  },
};

const modernSleekTheme = {
  primary: {
    main: "#607D8B",
  },
  secondary: {
    main: "#FFC107",
  },
  background: {
    default: "#FAFAFA",
  },
  text: {
    primary: "#424242",
  },
  info: {
    main: "#E91E63",
  },
};

const earthyWarmTheme = {
  primary: {
    main: "#795548",
  },
  secondary: {
    main: "#FF9800",
  },
  background: {
    default: "#FFF3E0",
  },
  text: {
    primary: "#3E2723",
  },
};

const coolCalmTheme = {
  primary: {
    main: "#009688",
  },
  secondary: {
    main: "#00BCD4",
  },
  background: {
    default: "#E0F7FA",
  },
  text: {
    primary: "#263238",
  },
};

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontSize: "4.5rem",
    },
    h2: {
      fontSize: "3.75rem",
    },
    h3: {
      fontSize: "3rem",
    },
    h4: {
      fontSize: "2.125rem",
    },
    h5: {
      fontSize: "1.5rem",
    },
    h6: {
      fontSize: "1.25rem",
    },
  },
  palette: modernSleekTheme,
});

export default theme;
