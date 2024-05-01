import { Box, Image, Text } from "@chakra-ui/react";
import logoParoquia from "../assets/logoParoquia.jpeg";
import imgSaoTarcisio from "../assets/imgSaoTarcsio.jpg";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";

const Header = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box
        as="header"
        color="#FFFFFF"
        p={4}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Image src={logoParoquia} alt="Logo Paroquia São José" h={60} />
        <Text fontSize="5xl" fontWeight="bold">
          Pastoral dos Coroinhas e Cerimoniários
        </Text>
        <Image src={imgSaoTarcisio} alt="Padroeiro dos coroinhas" h={60} />
      </Box>
    </ChakraProvider>
  );
};

export default Header;
