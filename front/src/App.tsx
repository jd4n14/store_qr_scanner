import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./theme";
import Router from "./routes";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
