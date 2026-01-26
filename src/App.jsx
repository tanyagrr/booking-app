import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import About from "./pages/About";
import Main from "./pages/Main/Main";
import Hotels from "./pages/Hotels/Hotels";
import { theme } from "./theme/theme";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Main />} />
              <Route path="/about" element={<About />} />
              <Route path="/hotels" element={<Hotels />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
