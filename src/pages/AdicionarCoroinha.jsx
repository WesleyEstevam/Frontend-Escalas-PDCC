import { Box } from "@chakra-ui/react";
import AdicionarCoroinha from "../components/AdicionarCoroinha";
import Header from "../components/Header";

function AddCoroinha() {
  return (
    <>
      <Box backgroundColor="#ffffd7">
        <Header />
        <AdicionarCoroinha />
      </Box>
    </>
  );
}

export default AddCoroinha;
