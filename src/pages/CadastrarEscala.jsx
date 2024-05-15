import { Box } from "@chakra-ui/react";
import CadastrarEscala from "../components/CadastrarEscala";
import Header from "../components/Header";

function NovaEscala() {
  return (
    <>
      <Box>
        <Header />
        <CadastrarEscala />
      </Box>
    </>
  );
}

export default NovaEscala;
