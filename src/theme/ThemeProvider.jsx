import { useState, useMemo, useEffect } from "react";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Cookies from "js-cookie";
import { ColorModeContext } from "../context/ColorModeContext";

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return Cookies.get("theme") || "light";
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          Cookies.set("theme", newMode, { expires: 30 });
          return newMode;
        });
      },
    }),
    []
  );

  useEffect(() => {
    const savedTheme = Cookies.get("theme");
    if (savedTheme) {
      setMode(savedTheme);
    }
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: {
                  main: "#1976d2",
                },
                background: {
                  default: "#f5f5f5",
                  paper: "#ffffff",
                },
              }
            : {
                primary: {
                  main: "#90caf9",
                },
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
};
