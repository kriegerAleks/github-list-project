import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme();

interface ThemeWrapperProps {
  children: Array<React.ReactElement> | React.ReactElement;
}

function ThemeWrapper({ children }: ThemeWrapperProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
      </ThemeProvider>
    </>
  );
}
export default ThemeWrapper;
