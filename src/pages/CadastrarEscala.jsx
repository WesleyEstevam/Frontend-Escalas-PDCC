import { Box } from "@chakra-ui/react";
import CadastrarEscala from "../components/CadastrarEscala";
import Header from "../components/Header";

function NovaEscala() {
  return (
    <>
      <Box backgroundColor="#ffffd7">
        <Header />
        <CadastrarEscala />
      </Box>
    </>
  );
}

export default NovaEscala;
