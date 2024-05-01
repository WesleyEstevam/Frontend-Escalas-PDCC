import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CadastroEscala from "./pages/CadastroEscala";
import "./index.css";
export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro-escala" element={<CadastroEscala />} />
      </Routes>
    </BrowserRouter>
  );
};
