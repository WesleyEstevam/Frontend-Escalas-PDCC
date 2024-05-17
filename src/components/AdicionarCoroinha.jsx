import {
  Button,
  FormControl,
  FormLabel,
  VStack,
  Grid,
  Select,
  Center,
  Heading,
  Box,
  Link,
  Flex,
  Container,
} from "@chakra-ui/react";
import axios from "axios";
import { baseURL } from "../api/api";
import { useState, useEffect } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { alertaAddCoroinha } from "./alertas";

const AdicionarCoroinha = () => {
  const [nomesCoroinhas, setNomesCoroinhas] = useState([]);
  const [nomesObjetosLiturgicos, setNomesObjetosLiturgicos] = useState([]);
  const [escalas, setEscalas] = useState([
    {
      id_coroinha: null,
      id_objeto: null,
    },
  ]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id_escala = JSON.parse(queryParams.get("data"));

  useEffect(() => {
    const fetchNomesCoroinhas = async () => {
      try {
        const response = await axios.get(`${baseURL}coroinhas`);
        setNomesCoroinhas(response.data);
      } catch (error) {
        console.error("Erro ao buscar nomes dos coroinhas:", error);
      }
    };

    const fetchNomesObjetosLiturgicos = async () => {
      try {
        const response = await axios.get(`${baseURL}objetos`);
        setNomesObjetosLiturgicos(response.data);
      } catch (error) {
        console.error("Erro ao buscar os objetos liturgicos:", error);
      }
    };

    fetchNomesCoroinhas();
    fetchNomesObjetosLiturgicos();
  }, []);

  const handleChange = (index, atributo, value) => {
    const novasEscalas = [...escalas];
    novasEscalas[index][atributo] = value;
    setEscalas(novasEscalas);
  };

  const navigate = useNavigate();
  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `${baseURL}escalas/${id_escala}`,
        ...escalas
      );
      console.log(response.data);
      navigate("/");
      alertaAddCoroinha();
    } catch (error) {
      console.error("Ops! Ocorreu um erro: ", error);
    }
  };

  const addCoroinha = () => {
    setEscalas([...escalas, { id_coroinha: null, id_objeto: null }]);
  };

  const deletarLinha = (index) => {
    setEscalas((prevEscalas) => {
      const novasEscalas = [...prevEscalas];
      novasEscalas.splice(index, 1);
      return novasEscalas;
    });
  };

  return (
    <Box>
      <Flex align="center" justify="space-between" margin={10}>
        <Link href="/">
          <Button colorScheme="gray">Voltar</Button>
        </Link>
        <Heading as="h5" size="md">
          Adicionar Coroinha
        </Heading>
        <Box></Box>
      </Flex>
      <Flex direction="column">
        <Container maxW="5xl" marginLeft="20%">
          {escalas.map((escala, index) => (
            <Grid
              key={index}
              templateColumns="repeat(3, 1fr)"
              gap={8}
              marginTop="20px"
              alignItems="center"
            >
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Coroinha</FormLabel>
                  <Select
                    value={escala.id_coroinha || ""}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "id_coroinha",
                        parseInt(e.target.value)
                      )
                    }
                  >
                    <option>-</option>
                    {nomesCoroinhas.map((coroinha) => (
                      <option key={coroinha.id} value={coroinha.id_coroinha}>
                        {coroinha.nome_coroinha}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </VStack>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Objeto Litúrgico</FormLabel>
                  <Select
                    value={escala.id_objeto || ""}
                    onChange={(e) =>
                      handleChange(index, "id_objeto", parseInt(e.target.value))
                    }
                  >
                    <option>-</option>
                    {nomesObjetosLiturgicos.map((objeto) => (
                      <option key={objeto.id} value={objeto.id_objeto}>
                        {objeto.nome_objeto}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </VStack>
              <VStack>
                <FormControl>
                  <Button
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => deletarLinha(index)}
                  >
                    <DeleteIcon boxSize={6} />
                  </Button>
                </FormControl>
              </VStack>
            </Grid>
          ))}
        </Container>
      </Flex>
      <Center mt={10}>
        <Button colorScheme="red" mr={3} onClick={addCoroinha}>
          Adicionar Coroinha
        </Button>
        <Button colorScheme="blue" mr={3} onClick={handleSave}>
          Salvar
        </Button>
      </Center>
    </Box>
  );
};

export default AdicionarCoroinha;
