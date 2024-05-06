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
        bg={theme.colors.brand.primary}
        p={4}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Image src={logoParoquia} alt="Logo Paroquia São José" h={55} />
        <Text fontSize="3xl" fontWeight="bold">
          Pastoral dos Coroinhas e Cerimoniários
        </Text>
        <Image src={imgSaoTarcisio} alt="Padroeiro dos coroinhas" h={55} />
      </Box>
    </ChakraProvider>
  );
};

export default Header;
