import Header from "../components/Header";
import EscalasList from "../components/EscalasList";
import { Box } from "@chakra-ui/react";

function Home() {
  return (
    <>
      <Box bg="#ec3c21">
        <Header />
        <EscalasList />
      </Box>
    </>
  );
}

export default Home;
