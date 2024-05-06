import Header from "../components/Header";
import EscalasList from "../components/EscalasList";
import { Box } from "@chakra-ui/react";

function Home() {
  return (
    <>
      <Box backgroundColor="#ffffd7">
        <Header />
        <EscalasList />
      </Box>
    </>
  );
}

export default Home;
