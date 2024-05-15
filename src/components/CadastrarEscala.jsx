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

const CadastrarEscala = () => {
  const [capelas, setCapelas] = useState([]);
  const [escala, setEscala] = useState({
    id_capela: "",
    horario_missa: "",
    tipo_cerimonia: "",
    data_escala: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEscala({
      ...escala,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchCapelas = async () => {
      try {
        const response = await axios.get(`${baseURL}capelas`);
        // Modificando a estrutura do array de capelas para armazenar apenas IDs e nomes
        const capelasData = response.data.map((capela) => ({
          id: capela.id_capela,
          nome: capela.nome_capela,
        }));
        setCapelas(capelasData);
      } catch (error) {
        console.error("Erro ao buscar o nome da capela:", error);
      }
    };
    fetchCapelas();
  }, []);

  const handleSave = async () => {
    if (!escala.id_capela) {
      console.error("Por favor, selecione uma capela.");
      return;
    }
    try {
      // Enviando apenas o ID da capela na requisição POST
      await axios.post(`${baseURL}escalas`, {
        ...escala,
        id_capela: parseInt(escala.id_capela),
      });
    } catch (error) {
      console.error("Ops! Ocorreu um erro:", error);
    }
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
                  name="id_capela"
                  value={escala.id_capela || ""}
                  onChange={handleChange}
                >
                  <option value="">-</option>
                  {capelas.map((capela) => (
                    <option key={capela.id} value={capela.id}>
                      {capela.nome}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Horário da Missa</FormLabel>
                <Select
                  name="horario_missa"
                  value={escala.horario_missa}
                  onChange={handleChange}
                >
                  <option value="">-</option>
                  <option value="07:00h">07:00h</option>
                  <option value="09:00h">09:00h</option>
                  <option value="11:00h">11:00h</option>
                  <option value="17:00h">17:00h</option>
                  <option value="18:00h">18:00h</option>
                  <option value="18:30h">18:30h</option>
                  <option value="19:00h">19:00h</option>
                  <option value="19:30h">19:30h</option>
                </Select>
              </FormControl>
            </VStack>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Tipo de cerimonia</FormLabel>
                <Input
                  name="tipo_cerimonia"
                  type="text"
                  placeholder="Ex: Domingo de Ramos"
                  value={escala.tipo_cerimonia}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Escala do dia</FormLabel>
                <Input
                  name="data_escala"
                  type="date"
                  value={escala.data_escala}
                  onChange={handleChange}
                />
              </FormControl>
            </VStack>
          </Grid>
          <Center margin={10}>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Salvar
            </Button>
          </Center>
        </Container>
      </Box>
    </>
  );
};

export default CadastrarEscala;
