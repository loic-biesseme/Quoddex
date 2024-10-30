import { ThemeProvider } from "@mui/material/styles";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import Router, { CurrentRoute } from "./router";
import theme from "./theme";
// import "./app.css";
import { SnackbarProvider } from "notistack";
import "./index.css";
import MainNav from "./mainNav";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={1} autoHideDuration={2600} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} style={{ borderRadius: "14px" }}>
          <Router>
            <CurrentRoute />
            <MainNav />
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
