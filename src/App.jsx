import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";
import AdicionarCoroinha from "./pages/AdicionarCoroinha";
import Home from "./pages/Home";
import "./index.css";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro-escala" element={<AdicionarCoroinha />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};
