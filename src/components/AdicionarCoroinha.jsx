import {
  Button,
  FormControl,
  FormLabel,
  VStack,
  Grid,
  Select,
  Center,
  Container,
  Input,
  Heading,
  Box,
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import { baseURL } from "../api/api";
import { useState, useEffect } from "react";

const AddCoroinha = () => {
  const [nomesCoroinhas, setNomesCoroinhas] = useState([]);
  const [nomesObjetosLiturgicos, setNomesObjetosLiturgicos] = useState([]);
  const [escalas, setEscalas] = useState([
    { nome_coroinha: "", objeto_liturgico: "" },
  ]);
  const [horariosMissas, setHorariosMissas] = useState([]);

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

    const fetchHorariosMissas = async () => {
      try {
        const response = await axios.get(`${baseURL}horarios`);
        setHorariosMissas(response.data);
      } catch (error) {
        console.error("Erro ao buscar horários das missas:", error);
      }
    };
    fetchHorariosMissas();
    fetchNomesCoroinhas();
    fetchNomesObjetosLiturgicos();
  }, []);

  const handleChange = (index, atributo, value) => {
    const novasEscalas = [...escalas];
    novasEscalas[index][atributo] = value;
    setEscalas(novasEscalas);
  };

  const handleSave = () => {
    // Implementar a lógica de salvar as escalas
  };

  const adicionarCoroinha = () => {
    setEscalas([...escalas, { nome_coroinha: "", objeto_liturgico: "" }]);
  };

  return (
    <>
      <Box backgroundColor="#ffffd7">
        <Link href="/">
          <Button margin={2} colorScheme="gray">
            Voltar
          </Button>
        </Link>
        <Container backgroundColor="#ffffd7">
          <Center>
            <Heading as="h3" size="lg">
              Nova Escala
            </Heading>
          </Center>
          <Grid templateColumns="repeat(2, 1fr)" gap={8} marginTop="20px">
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Nome da Igreja</FormLabel>
                <Select
                  value={escalas.nome_capela}
                  onChange={(e) =>
                    handleChange(0, "nome_capela", e.target.value)
                  }
                >
                  {horariosMissas.map((igreja) => (
                    <option key={igreja.id} value={igreja.nome_capela}>
                      {igreja.nome_capela}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Horário da Missa</FormLabel>
                <Select
                  value={escalas.horario_missa}
                  onChange={(e) =>
                    handleChange(0, "horario_missa", e.target.value)
                  }
                >
                  {horariosMissas.map((horario) => (
                    <option key={horario.id} value={horario.horario_missa}>
                      {horario.horario_missa}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </VStack>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Tipo de cerimonia</FormLabel>
                <Input
                  type="text"
                  value={escalas.tipo_cerimonia}
                  onChange={(e) =>
                    handleChange(0, "tipo_cerimonia", e.target.value)
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Escala do dia</FormLabel>
                <Input
                  type="date"
                  value={escalas.data_escala}
                  onChange={(e) =>
                    handleChange(0, "data_escala", e.target.value)
                  }
                />
              </FormControl>
            </VStack>
          </Grid>
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
                    value={escala.nome_coroinha}
                    onChange={(e) =>
                      handleChange(index, "nome_coroinha", e.target.value)
                    }
                  >
                    {nomesCoroinhas.map((coroinha) => (
                      <option key={coroinha.id} value={coroinha.nome_coroinha}>
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
                    value={escala.objeto_liturgico}
                    onChange={(e) =>
                      handleChange(index, "objeto_liturgico", e.target.value)
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
            <Button colorScheme="red" mr={3} onClick={adicionarCoroinha}>
              Adicionar Coroinha
            </Button>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Salvar
            </Button>
          </Center>
        </Container>
      </Box>
    </>
  );
};

export default AddCoroinha;
