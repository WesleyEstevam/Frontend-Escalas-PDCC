import { Box } from "@chakra-ui/react";
import AddCoroinha from "../components/AdicionarCoroinha";
import Header from "../components/Header";

function AdicionarCoroinha() {
  return (
    <>
      <Box>
        <Header />
        <AddCoroinha />
      </Box>
    </>
  );
}

export default AdicionarCoroinha;
