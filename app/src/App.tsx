import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./theme";
import Router from "./routes";
import { HelmetProvider } from "react-helmet-async";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./config/query.ts";
import {Toaster} from "react-hot-toast";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider >
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
      <Toaster />

    </QueryClientProvider>
  );
}

export default App;
