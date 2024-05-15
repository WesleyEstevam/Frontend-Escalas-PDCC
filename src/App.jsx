import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";
import Home from "./pages/Home";
import NovaEscala from "./pages/CadastrarEscala";
import AdicionarCoroinha from "./pages/AdicionarCoroinha";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro-escala" element={<NovaEscala />} />
          <Route path="/adicionar-coroinha" element={<AdicionarCoroinha />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};
