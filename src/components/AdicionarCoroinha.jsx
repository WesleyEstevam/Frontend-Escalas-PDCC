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
} from "@chakra-ui/react";
import axios from "axios";
import { baseURL } from "../api/api";
import { useState, useEffect } from "react";

const AdicionarCoroinha = () => {
  const [nomesCoroinhas, setNomesCoroinhas] = useState([]);
  const [nomesObjetosLiturgicos, setNomesObjetosLiturgicos] = useState([]);
  const [escalas, setEscalas] = useState([
    {
      id_coroinha: null,
      id_objeto: null,
    },
  ]);

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
    console.log(novasEscalas);
    setEscalas(novasEscalas);
  };

  const handleSave = () => {
    // Implementar a lógica de salvar as escalas
    axios
      .put(baseURL + "escalas", escalas)
      .then(() => {
        console.log(escalas);
      })
      .catch((error) => {
        console.error("ops! ocorreu um erro " + error);
      });
  };

  const addCoroinha = () => {
    setEscalas([...escalas]);
  };

  return (
    <Box>
      <Center margin={10}>
        <Heading as="h5" size="md">
          Adicionar Coroinha
        </Heading>
      </Center>
      {escalas.map((escala, index) => (
        <Grid
          key={index}
          templateColumns="repeat(2, 1fr)"
          gap={8}
          marginTop="20px"
        >
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Coroinha</FormLabel>
              <Select
                value={escala.id_coroinha || ""}
                onChange={(e) =>
                  handleChange(index, "id_coroinha", parseInt(e.target.value))
                }
              >
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
                {nomesObjetosLiturgicos.map((objeto) => (
                  <option key={objeto.id} value={objeto.nome_objeto}>
                    {objeto.nome_objeto}
                  </option>
                ))}
              </Select>
            </FormControl>
          </VStack>
        </Grid>
      ))}
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
